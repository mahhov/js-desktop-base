Add-Type @"
	using System;
	using System.Runtime.InteropServices;
	public class UserWindows {
		[DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
		[DllImport("user32.dll")] public static extern IntPtr GetWindowText(IntPtr hWnd, System.Text.StringBuilder text, int count);
	}
"@

foreach ($i in $input) {
    $frontWindow = [UserWindows]::GetForegroundWindow()
    $stringBuilder = New-Object System.Text.StringBuilder 256
    $len = [UserWindows]::GetWindowText($frontWindow, $stringBuilder, 256)
    $stringBuilder.ToString()
}
