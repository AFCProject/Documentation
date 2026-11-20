## Creality CFS Related Commands

These commands are used to manage Creality CFS boxes through the `AFC_CFS` unit driver (status, loading and
unloading a lane, ejecting a lane back into the box, RFID tags and debugging). AFC's own tool changes (`T0`, `T1`, ...)
load and unload CFS lanes by themselves; `AFC_CFS_TOOL_LOAD` and `AFC_CFS_TOOL_UNLOAD` run the same sequences by hand
but don't home, purge or unload another lane first.

`AFC_CFS_STATUS` and `AFC_CFS_EJECT` also appear as macros in Mainsail and Fluidd (with AFC's `show_macros`); the
other commands are typed in the console. Commands that take `UNIT` use the first `[AFC_CFS]` section in the config
when `UNIT` is left out.

### Status & Diagnostics

-----
[AFC_CFS_STATUS]
::: AFC_CFS.afcCFS.cmd_AFC_CFS_STATUS
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_CFS_RECONNECT]
::: AFC_CFS.afcCFS.cmd_AFC_CFS_RECONNECT
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_CFS_TRACE]
::: AFC_CFS.afcCFS.cmd_AFC_CFS_TRACE
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_CFS_RAW]
::: AFC_CFS.afcCFS.cmd_AFC_CFS_RAW
    options:
      docstring_style: numpy
      heading_level: 4

### Loading & Unloading

-----
[AFC_CFS_TOOL_LOAD]
::: AFC_CFS.afcCFS.cmd_AFC_CFS_TOOL_LOAD
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_CFS_TOOL_UNLOAD]
::: AFC_CFS.afcCFS.cmd_AFC_CFS_TOOL_UNLOAD
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_CFS_EJECT]
::: AFC_CFS.afcCFS.cmd_AFC_CFS_EJECT
    options:
      docstring_style: numpy
      heading_level: 4

### RFID

-----
[AFC_CFS_READ_TAG]
::: AFC_CFS.afcCFS.cmd_AFC_CFS_READ_TAG
    options:
      docstring_style: numpy
      heading_level: 4
