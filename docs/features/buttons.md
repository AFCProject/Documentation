# Button controls

!!!note "Original Design"

    The original design of this feature was created by @Trev1Ak and is available
    [here](https://discord.com/channels/1229586267671629945/1327060485408952340).

    This feature is now built into the AFC-Klipper-Add-On and can be enabled by following the instructions below.

    Do **NOT** use the provided Klipper config file from the original design, as it is not compatible with the
    AFC-Klipper-Add-On.

An optional feature that can be supported is the use of physical buttons to control various functionality of the AFC
system.

If enabled, and configured properly, the following functionality can be controlled via buttons:

Press <1.2 (short-press) seconds commands as follows:

- If no lane is loaded to tool head it will load commanded lane.
- If lane loaded to tool head is other than commanded lane it will unload other lane and load commanded lane.
- If the commanded lane is loaded to the tool head, it will automatically unload the lane.

Press >=1.2 (long-press) seconds commands as follows:

- If lane is loaded to tool head it will unload lane and eject spool
- If another lane is loaded to tool head it will only eject commanded lane and not interrupt other lanes.

BOM:

- 4ea Omron B3F-1026 switches/Optional verified off brand switches Amazon https://a.co/d/hmtJkk8
- 4ea JST 3 pin male connectors for AFC Lite board
- 3 Meters of 24awg or 28awg wire (your choice)
