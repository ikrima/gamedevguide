# ExifTool Cheatsheet

## Basics

### Show all available EXIF tags of a file

```bash
exiftool -G0:1 -all -a -s <filename>
exiftool -G0:1 -all:time -a -s <filename>
exiftool -G0:1 -alldates -a -s <filename>
exiftool -G0:1 -all -a -n -JSON -api struct=2 -charset filename=UTF8 <filename>
```

### Validate a file and show warnings and errors

```bash
exiftool -validate -warning -error -a FILE
```

## Missing Metadata

### Find all photos Without 'createdate' EXIF tag

```bash
exiftool -if '(not $createdate)' -p '$directory/$filename' -r .
```

### Find all photos Without 'datetimeoriginal' EXIF tag

```bash
exiftool -if '(not $datetimeoriginal)' -p '$directory/$filename' -r .
```

### Find all photos Without any date EXIF tag

```bash
exiftool -if '(not $datetimeoriginal) and (not $createdate)' -p '$directory/$filename' -r .
```

### Find all photos without GPS location tag

```bash
exiftool -if 'not $gpslatitude' -p '$directory/$filename' -r .
```

## Metadata Cleanup

### Update DateTime if it doesn't exist

```bash
exiftool -q -if 'not $DateTimeOriginal' -r -p 'Setting DateTimeOriginal for: $directory/$filename' -overwrite_original -DateTimeOriginal=XXXX
```

### Import all image data from JSON files (from Google Takeout), and write to EXIF data of corresponding photos

```bash
exiftool -overwrite_original -v -r -d %s -tagsfromfile '%d/%F.json' '-GPSAltitude<GeoDataAltitude' '-GPSLatitude<GeoDataLatitude' '-GPSLatitudeRef<GeoDataLatitude' '-GPSLongitude<GeoDataLongitude' '-GPSLongitudeRef<GeoDataLongitude' '-ModifyDate<PhotoTakenTimeTimestamp' '-CreateDate<PhotoTakenTimeTimestamp' '-DateTimeOriginal<PhotoTakenTimeTimestamp' -ext jpg -overwrite_original
```

### Remove ALL metadata from a file

```bash
exiftool -overwrite_original -all= <filename>
```

### Add CreateDate Exif Property and Copy DateTimeOriginal Exif Property Value into It

Useful for if many pictures do not have the CreateDate exif-property, but do have the DateTimeOriginal exif-property. If you want the CreateDate exif-property to have the same value as the DateTimeOriginal exif property:

```bash
exiftool -overwrite_original '-createdate<datetimeoriginal' -r -if '(not $createdate and $datetimeoriginal)' <your directory>
```

## Face Tags

### Find all photos that have NO Microsoft Face tag but HAVE an XMP-MWG Face tag, and add a keyword to those

```bash
exiftool -r -ext jpg -overwrite_original -m -v -if '($RegionName) and (not $RegionRectangle)' -Keywords+='Has-MS-Face-but-no-XMP-face' .
```

### Find all photos that have NO Microsoft (MXP-MP) Face tag but HAVE a name in the Digikam /Mensen/ tree

```bash
exiftool -p '$directory/$filename' -r -if '($XMP-digiKam:TagsList=~/INSERT-NAME-HERE/i) and (not $RegionPersonDisplayName=~/INSERT-NAME-HERE/i)' .
```

### Find all photos that have NO Microsoft (MXP-MP) Face tag but HAVE a name in the Digikam /Mensen/ tree and add a tag to those

```bash
exiftool -r -ext jpg -overwrite_original -m -if '($XMP-digiKam:TagsList=~/INSERT-NAME-HERE/i) and (not $RegionPersonDisplayName=~/INSERT-NAME-HERE/i)' -XMP-digiKam:TagsList+='Check' .
```

### Create a .txt file with all photos, and listing who is on which photo (face tags)

```bash
exiftool -T -Directory -Filename -RegionPersonDisplayName -r -ext jpg . > PeopleTags.txt
```

## Organize

### Rename file to CreateDate of images. This will change the file names to something like '20221028-150847.jpg'

```bash
exiftool -v '-filename <${CreateDate}.%e' -d %Y%m%d-%H%M%S .
```

### Write all (incl. GPS location) tags FROM .mp4 files TO corresponding XMP files

```bash
exiftool -v -v -r -ext mp4 -overwrite_original -tagsfromfile %d%f.mp4 -all:all -xmp:all -exif:all -composite:all -quicktime:all -iptc:all -gps:all %d%f.xmp .
```

### Write all (incl. GPS location) tags FROM .xmp files TO corresponding MP4 video files

```bash
exiftool -v -r -overwrite_original -tagsfromfile %d%f.xmp -all:all -xmp:all -exif:all -composite:all -quicktime:all -iptc:all -gps:all -ext m4v -ext mov -ext mp4 -ext avi .
```
