Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $root "public\icons"

$bgColor    = [System.Drawing.Color]::FromArgb(255, 0x1B, 0x17, 0x12)
$outerColor = [System.Drawing.Color]::FromArgb(255, 0xE4, 0x57, 0x2E)
$innerColor = [System.Drawing.Color]::FromArgb(255, 0xF2, 0xB9, 0x79)

function New-FlameBitmap {
    param(
        [int]$Size,
        [double]$Scale = 1.0,
        [double]$CenterX = 0.5,
        [double]$CenterY = 0.5,
        [bool]$Transparent = $false
    )

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    if ($Transparent) {
        $g.Clear([System.Drawing.Color]::Transparent)
    } else {
        $g.Clear($bgColor)
    }

    # base 512-unit design space, then scaled/translated onto the canvas
    $unit = $Size / 512.0 * $Scale
    $offX = ($Size / 2.0) - (256 * $unit) + ($Size * ($CenterX - 0.5))
    $offY = ($Size / 2.0) - (256 * $unit) + ($Size * ($CenterY - 0.5))

    function P([double]$x, [double]$y) {
        [System.Drawing.PointF]::new([float]($x * $unit + $offX), [float]($y * $unit + $offY))
    }

    # outer flame: triangle tip fused with a round belly
    $outerBrush = New-Object System.Drawing.SolidBrush $outerColor
    $outerTri = [System.Drawing.PointF[]]@((P 256 70), (P 166 300), (P 346 300))
    $g.FillPolygon($outerBrush, $outerTri)
    $g.FillEllipse($outerBrush, [float](126*$unit+$offX), [float](190*$unit+$offY), [float](260*$unit), [float](260*$unit))

    # inner flame: smaller, sits lower, lighter color
    $innerBrush = New-Object System.Drawing.SolidBrush $innerColor
    $innerTri = [System.Drawing.PointF[]]@((P 256 190), (P 206 340), (P 306 340))
    $g.FillPolygon($innerBrush, $innerTri)
    $g.FillEllipse($innerBrush, [float](186*$unit+$offX), [float](290*$unit+$offY), [float](140*$unit), [float](140*$unit))

    $g.Dispose()
    return $bmp
}

if (!(Test-Path $iconsDir)) { New-Item -ItemType Directory -Path $iconsDir | Out-Null }

# any-purpose icons: flame fills most of the canvas
(New-FlameBitmap -Size 512 -Scale 1.0).Save((Join-Path $iconsDir "icon-512.png"), [System.Drawing.Imaging.ImageFormat]::Png)
(New-FlameBitmap -Size 192 -Scale 1.0).Save((Join-Path $iconsDir "icon-192.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# maskable icon: shrink so the flame stays inside the ~80% safe-zone circle
(New-FlameBitmap -Size 512 -Scale 0.62 -CenterY 0.52).Save((Join-Path $iconsDir "icon-512-maskable.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# apple touch icon: iOS wants an opaque 180x180, slightly smaller flame looks better once iOS rounds the corners
(New-FlameBitmap -Size 180 -Scale 0.85).Save((Join-Path $iconsDir "apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Icons written to $iconsDir"
