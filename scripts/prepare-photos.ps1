param([Parameter(Mandatory=$true)][string]$SourceDirectory)
$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$photoMap = @(
  @{ File='63BA3F59-4223-4F4E-9EC4-516BD50BEEA5.HEIC'; Name='tuna-catch-marina'; Rotate=0 },
  @{ File='IMG_0218.HEIC'; Name='american-red-snapper-offshore'; Rotate=0 },
  @{ File='IMG_0228.HEIC'; Name='mixed-grouper-snapper-dock'; Rotate=-90 },
  @{ File='IMG_3145.HEIC'; Name='pacific-salmon-boat'; Rotate=0 },
  @{ File='IMG_3151.HEIC'; Name='pacific-halibut-port-renfrew-boat'; Rotate=0 },
  @{ File='IMG_3164.HEIC'; Name='pacific-halibut-port-renfrew-dock'; Rotate=0 },
  @{ File='IMG_3523.HEIC'; Name='gag-grouper-boat'; Rotate=0 },
  @{ File='1A5E1B42-C8AB-48A0-80B1-6CF66647BC90.JPG'; Name='red-grouper-dock'; Rotate=0 }
)
foreach ($entry in $photoMap) {
  $sourceFile = Join-Path $SourceDirectory $entry.File
  $outputStem = Join-Path $siteRoot ('images/photos/' + $entry.Name)
  $common = @($sourceFile, '-auto-orient', '-rotate', [string]$entry.Rotate, '-colorspace', 'sRGB', '-strip')
  & magick @common -resize '1200x1600>' -quality 82 ($outputStem + '.webp')
  if ($LASTEXITCODE) { throw "Image conversion failed: $sourceFile" }
  & magick @common -resize '600x800>' -quality 80 ($outputStem + '-600.webp')
  & magick @common -resize '1200x1600>' -sampling-factor '4:2:0' -quality 85 ($outputStem + '.jpg')
}
# Crops use the inspected 4284 by 5712 originals; the fish stays inside the crop.
foreach ($entry in @(
  @{ File='IMG_0218.HEIC'; Name='home-red-snapper'; Crop='4284x2856+0+1680' },
  @{ File='IMG_3151.HEIC'; Name='band-halibut'; Crop='4284x2856+0+1450' }
)) {
  $sourceFile = Join-Path $SourceDirectory $entry.File
  $outputStem = Join-Path $siteRoot ('images/hero/' + $entry.Name)
  $common = @($sourceFile,'-auto-orient','-crop',$entry.Crop,'+repage','-colorspace','sRGB','-strip')
  & magick @common -resize '1920x1280!' -quality 82 ($outputStem + '.webp')
  & magick @common -resize '960x640!' -quality 80 ($outputStem + '-960.webp')
  & magick @common -resize '1920x1280!' -sampling-factor '4:2:0' -quality 85 ($outputStem + '.jpg')
}
# Share images preserve the entire photograph on a background matching the site.
foreach ($entry in @(
  @{Photo='american-red-snapper-offshore';Slug='red-snapper'},
  @{Photo='pacific-halibut-port-renfrew-boat';Slug='halibut'},
  @{Photo='gag-grouper-boat';Slug='gag-grouper'},
  @{Photo='red-grouper-dock';Slug='red-grouper'}
)) {
  & magick (Join-Path $siteRoot ('images/photos/' + $entry.Photo + '.jpg')) -resize '1200x630' -background '#0b1220' -gravity center -extent '1200x630' -strip -quality 86 (Join-Path $siteRoot ('images/og/' + $entry.Slug + '-catch.jpg'))
}
