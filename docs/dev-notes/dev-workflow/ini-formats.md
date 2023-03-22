# INI Formats

[Source](https://github.com/madmurphy/libconfini/wiki/INI-formats)

## Commonly used formats

### A clone of `INI_DEFAULT_FORMAT` that gets rid of comments and disabled entries

```c
#define INI_DEFAULT_FORMAT_IC \
  ((IniFormat) { \
    .delimiter_symbol = INI_EQUALS, \
    .case_sensitive = false, \
    .semicolon_marker = INI_IGNORE, \
    .hash_marker = INI_IGNORE, \
    .section_paths = INI_ABSOLUTE_AND_RELATIVE, \
    .multiline_nodes = INI_MULTILINE_EVERYWHERE, \
    .no_single_quotes = false, \
    .no_double_quotes = false, \
    .no_spaces_in_names = false, \
    .implicit_is_not_empty = false, \
    .do_not_collapse_values = false, \
    .preserve_empty_quotes = false, \
    .disabled_after_space = false, \
    .disabled_can_be_implicit = false \
  })

/*  `ini_fton(INI_DEFAULT_FORMAT_IC)` returns `2621`  */
```

### A clone of `INI_UNIXLIKE_FORMAT` that gets rid of comments and disabled entries

```c
#define INI_UNIXLIKE_FORMAT_IC \
  ((IniFormat) { \
    .delimiter_symbol = INI_ANY_SPACE, \
    .case_sensitive = false, \
    .semicolon_marker = INI_IGNORE, \
    .hash_marker = INI_IGNORE, \
    .section_paths = INI_ABSOLUTE_AND_RELATIVE, \
    .multiline_nodes = INI_MULTILINE_EVERYWHERE, \
    .no_single_quotes = false, \
    .no_double_quotes = false, \
    .no_spaces_in_names = false, \
    .implicit_is_not_empty = false, \
    .do_not_collapse_values = false, \
    .preserve_empty_quotes = false, \
    .disabled_after_space = false, \
    .disabled_can_be_implicit = false \
  })

/*  `ini_fton(INI_UNIXLIKE_FORMAT_IC)` returns `2560`  */
```

### A format fast to parse

```c
#define INI_FAST_FORMAT \
  ((IniFormat) { \
    .delimiter_symbol = INI_EQUALS, \
    .case_sensitive = false, \
    .semicolon_marker = INI_IGNORE, \
    .hash_marker = INI_IGNORE, \
    .section_paths = INI_ABSOLUTE_AND_RELATIVE, \
    .multiline_nodes = INI_NO_MULTILINE, \
    .no_single_quotes = false, \
    .no_double_quotes = false, \
    .no_spaces_in_names = false, \
    .implicit_is_not_empty = false, \
    .do_not_collapse_values = true, \
    .preserve_empty_quotes = true, \
    .disabled_after_space = false, \
    .disabled_can_be_implicit = false \
  })

/*  `ini_fton(INI_FAST_FORMAT)` returns `3197501`  */
```

## Known Formats

### GNU, Unix

#### `/etc/nsswitch.conf`

```c
#define NSSWITCH_CONF_FORMAT \
    ((IniFormat) { \
        .delimiter_symbol = INI_COLON, \
        .case_sensitive = false, \
        .semicolon_marker = INI_IS_NOT_A_MARKER, \
        .hash_marker = INI_DISABLED_OR_COMMENT, \
        .multiline_nodes = INI_NO_MULTILINE, \
        .section_paths = INI_NO_SECTIONS, \
        .no_single_quotes = true, \
        .no_double_quotes = true, \
        .no_spaces_in_names = true, \
        .implicit_is_not_empty = false, \
        .do_not_collapse_values = false, \
        .preserve_empty_quotes = false, \
        .disabled_after_space = false, \
        .disabled_can_be_implicit = false \
    })

/*  `ini_fton(NSSWITCH_CONF_FORMAT)` returns `521146`  */
```

#### `/etc/gnunet.conf`

```c
/*  Original parser: https://git.gnunet.org/gnunet.git/tree/src/util/configuration.c  */
#define GNUNET_CONF_FORMAT \
  ((IniFormat) { \
    .delimiter_symbol = INI_EQUALS, \
    .case_sensitive = true, \
    .semicolon_marker = INI_IS_NOT_A_MARKER, \
    .hash_marker = INI_DISABLED_OR_COMMENT, \
    .section_paths = INI_ONE_LEVEL_ONLY, \
    .multiline_nodes = INI_NO_MULTILINE, \
    .no_single_quotes = true, \
    .no_double_quotes = false, \
    .no_spaces_in_names = false, \
    .implicit_is_not_empty = false, \
    .do_not_collapse_values = false, \
    .preserve_empty_quotes = false, \
    .disabled_after_space = false, \
    .disabled_can_be_implicit = false \
  })

/*  `ini_fton(GNUNET_CONF_FORMAT)` returns `123837`  */
```

#### `/etc/rsyncd.conf`

```c
/*  Original parser: https://github.com/WayneD/rsync/blob/master/params.c  */
#define RSYNCD_CONF_FORMAT \
  ((IniFormat) { \
    .delimiter_symbol = INI_EQUALS, \
    .case_sensitive = true, \
    .semicolon_marker = INI_DISABLED_OR_COMMENT, \
    .hash_marker = INI_DISABLED_OR_COMMENT, \
    .section_paths = INI_ONE_LEVEL_ONLY, \
    .multiline_nodes = INI_MULTILINE_EVERYWHERE, \
    .no_single_quotes = true, \
    .no_double_quotes = true, \
    .no_spaces_in_names = false, \
    .implicit_is_not_empty = false, \
    .do_not_collapse_values = false, \
    .preserve_empty_quotes = false, \
    .disabled_after_space = false, \
    .disabled_can_be_implicit = false \
  })

/*  `ini_fton(RSYNCD_CONF_FORMAT)` returns `204989`  */
```

#### systemd (services, `tmpfiles`, etc.)

```c
/*  Original parser: https://github.com/systemd/systemd/blob/main/src/shared/conf-parser.c  */
#define SYSTEMD_CONF_FORMAT \
  ((IniFormat) { \
    .delimiter_symbol = INI_EQUALS, \
    .case_sensitive = true, \
    .semicolon_marker = INI_DISABLED_OR_COMMENT, \
    .hash_marker = INI_DISABLED_OR_COMMENT, \
    .section_paths = INI_ONE_LEVEL_ONLY, \
    .multiline_nodes = INI_MULTILINE_EVERYWHERE, \
    .no_single_quotes = false, \
    .no_double_quotes = false, \
    .no_spaces_in_names = false, \
    .implicit_is_not_empty = false, \
    .do_not_collapse_values = false, \
    .preserve_empty_quotes = false, \
    .disabled_after_space = false, \
    .disabled_can_be_implicit = false \
  })

/*  `ini_fton(SYSTEMD_CONF_FORMAT)` returns `8381`  */
```

#### `/etc/samba/smb.conf`

```c
/*  Original parser: https://github.com/ndevilla/iniparser  */
#define SAMBA_CONF_FORMAT \
    ((IniFormat) { \
        .delimiter_symbol = INI_EQUALS, \
        .case_sensitive = false, \
        .semicolon_marker = INI_DISABLED_OR_COMMENT, \
        .hash_marker = INI_ONLY_COMMENT, \
        .multiline_nodes = INI_NO_MULTILINE, \
        .section_paths = INI_ABSOLUTE_ONLY, \
        .no_single_quotes = false, \
        .no_double_quotes = false, \
        .no_spaces_in_names = false, \
        .implicit_is_not_empty = false, \
        .do_not_collapse_values = false, \
        .preserve_empty_quotes = false, \
        .disabled_after_space = true, \
        .disabled_can_be_implicit = false \
    })

/*  `ini_fton(SAMBA_CONF_FORMAT)` returns `4248637`  */
```

#### `/etc/pacman.conf`

```c
/*  Original parser: https://gitlab.archlinux.org/pacman/pacman/-/blob/master/src/common/ini.c  */
#define PACMAN_CONF_FORMAT \
    ((IniFormat) { \
        .delimiter_symbol = INI_EQUALS, \
        .case_sensitive = true, \
        .semicolon_marker = INI_IS_NOT_A_MARKER, \
        .hash_marker = INI_DISABLED_OR_COMMENT, \
        .multiline_nodes = INI_NO_MULTILINE, \
        .section_paths = INI_ABSOLUTE_ONLY, \
        .no_single_quotes = true, \
        .no_double_quotes = true, \
        .no_spaces_in_names = false, \
        .implicit_is_not_empty = true, \
        .do_not_collapse_values = false, \
        .preserve_empty_quotes = false, \
        .disabled_after_space = false, \
        .disabled_can_be_implicit = true \
    })

/*  `ini_fton(PACMAN_CONF_FORMAT)` returns `9163709`  */
```

#### PulseAudio (`/etc/pulse/daemon.conf`, `/etc/pulse/client.conf`, etc.)

```c
/*  Original parser: https://gitlab.freedesktop.org/pulseaudio/pulseaudio/-/blob/master/src/daemon/daemon-conf.c  */
#define PULSEAUDIO_CONF_FORMAT \
  ((IniFormat) { \
    .delimiter_symbol = INI_EQUALS, \
    .case_sensitive = true, \
    .semicolon_marker = INI_DISABLED_OR_COMMENT, \
    .hash_marker = INI_ONLY_COMMENT, \
    .section_paths = INI_NO_SECTIONS, \
    .multiline_nodes = INI_NO_MULTILINE, \
    .no_single_quotes = true, \
    .no_double_quotes = true, \
    .no_spaces_in_names = false, \
    .implicit_is_not_empty = false, \
    .do_not_collapse_values = false, \
    .preserve_empty_quotes = false, \
    .disabled_after_space = true, \
    .disabled_can_be_implicit = false \
  })

/*  `ini_fton(PULSEAUDIO_CONF_FORMAT)` returns `4453565`  */
```

### Microsoft Windows

#### Windows INI files

```c
/*  Original parser: Winbase.h (no source code available)  */
#define WINDOWS_API_FORMAT \
    ((IniFormat) { \
        .delimiter_symbol = INI_EQUALS, \
        .case_sensitive = false, \
        .semicolon_marker = INI_DISABLED_OR_COMMENT, \
        .hash_marker = INI_IS_NOT_A_MARKER, \
        .section_paths = INI_ABSOLUTE_ONLY, \
        .multiline_nodes = INI_NO_MULTILINE, \
        .no_single_quotes = false, \
        .no_double_quotes = false, \
        .no_spaces_in_names = false, \
        .implicit_is_not_empty = false, \
        .do_not_collapse_values = false, \
        .preserve_empty_quotes = false, \
        .disabled_after_space = false, \
        .disabled_can_be_implicit = false \
    })

/*  `ini_fton(WINDOWS_API_FORMAT)` returns `56381`  */
```

### OS agnostic

#### EditorConfig (`.editorconfig` files)

```c
/*  Original parser: https://github.com/benhoyt/inih  */
/*
 NOTE: **inih** uses an exotic syntax for multi-line entries. The
  library however is used only in the C implementation of
  **EditorConfig**, while for other languages other INI libraries
  are used. Unless they switched the multi-line feature off,
  writing multi-line `.editorconfig` files will likely create
  chaos in the framework; therefore we assume that
  **EditorConfig** does not support multi-line entries at all.
*/
#define EDITORCONFIG_FORMAT \
  ((IniFormat) { \
    .delimiter_symbol = INI_EQUALS, \
    .case_sensitive = false, \
    .semicolon_marker = INI_DISABLED_OR_COMMENT, \
    .hash_marker = INI_DISABLED_OR_COMMENT, \
    .section_paths = INI_ABSOLUTE_ONLY, \
    .multiline_nodes = INI_NO_MULTILINE, \
    .no_single_quotes = true, \
    .no_double_quotes = true, \
    .no_spaces_in_names = false, \
    .implicit_is_not_empty = false, \
    .do_not_collapse_values = true, \
    .preserve_empty_quotes = false, \
    .disabled_after_space = false, \
    .disabled_can_be_implicit = false \
  })

/*  `/*  `ini_fton(EDITORCONFIG_FORMAT)` returns `1298493`  */
```
