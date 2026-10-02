Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $root "public\icons"

# GenesysMed-style mark: serif "V" on a teal -> deep-blue diagonal gradient
$gradFrom  = [System.Drawing.Color]::FromArgb(255, 0x00, 0xB4, 0xCC)
$gradTo    = [System.Drawing.Color]::FromArgb(255, 0x00, 0x77, 0xA8)
$textColor = [System.Drawing.Color]::White

function New-VitalBitmap {
    param(
        [int]$Size,
        # "circle": round badge on transparency (any-purpose icons)
        # "full":   gradient fills the whole square (maskable / apple-touch,
        #           where the OS applies its own mask or rounded corners)
        [string]$Shape = "circle",
        # letter height relative to the canvas — keep it smaller for maskable
        # so it stays inside the ~80% safe-zone circle
        [double]$LetterScale = 0.6
    )

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.Color]::Transparent)

    $rect = New-Object System.Drawing.RectangleF 0, 0, $Size, $Size
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $gradFrom, $gradTo, 45.0
    if ($Shape -eq "circle") {
        $g.FillEllipse($brush, $rect)
    } else {
        $g.FillRectangle($brush, $rect)
    }

    # Georgia Bold stands in for Playfair Display (not installed system-wide)
    $font = New-Object System.Drawing.Font "Georgia", ([float]($Size * $LetterScale)), ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
    $fmt = New-Object System.Drawing.StringFormat
    $fmt.Alignment = [System.Drawing.StringAlignment]::Center
    $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
    $textBrush = New-Object System.Drawing.SolidBrush $textColor
    # nudge down slightly: the font's line box sits a bit high for a capital
    $textRect = New-Object System.Drawing.RectangleF 0, ([float]($Size * 0.03)), $Size, $Size
    $g.DrawString("V", $font, $textBrush, $textRect, $fmt)

    $g.Dispose()
    return $bmp
}

if (!(Test-Path $iconsDir)) { New-Item -ItemType Directory -Path $iconsDir | Out-Null }

# any-purpose icons: round badge, like the in-app logo
(New-VitalBitmap -Size 512 -Shape "circle").Save((Join-Path $iconsDir "icon-512.png"), [System.Drawing.Imaging.ImageFormat]::Png)
(New-VitalBitmap -Size 192 -Shape "circle").Save((Join-Path $iconsDir "icon-192.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# maskable icon: full-bleed gradient, smaller letter inside the safe zone
(New-VitalBitmap -Size 512 -Shape "full" -LetterScale 0.42).Save((Join-Path $iconsDir "icon-512-maskable.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# apple touch icon: iOS wants an opaque 180x180 and rounds the corners itself
(New-VitalBitmap -Size 180 -Shape "full" -LetterScale 0.5).Save((Join-Path $iconsDir "apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Icons written to $iconsDir"
