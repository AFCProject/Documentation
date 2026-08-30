# Lane Mapping
By default AFC automatically maps each lane to a T(n) macro that klipper calls and this is how AFC knows which lane to
swap to.

## Swapping mappings

- To swap mappings use [SET_MAP](../klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_SET_MAP) macro specifying the lane
  and which map to swap. With multiple mapping disabled (the default), AFC fully swaps the maps between the lane
  specified and the lane that currently holds the map being requested. With multiple mapping enabled, `SET_MAP` instead
  moves just that single `T(n)` mapping onto the specified lane, leaving any other mappings already on that lane
  untouched.
- As of version 1.3.0 AFC can swap all mappings between lanes with
  [AFC_SWAP_MAPPING](../klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_AFC_SWAP_MAPPING) macro. This macro is different
  from `SET_MAP` as it swaps the complete set of mappings between the two lanes (FROM/TO), regardless of how many T(n)
  macros each one has.

## Virtual Tools
As of version 1.3.0 AFC can map multiple T(n) macros to a single lane. This is disabled by default and needs to be
enabled by running
[AFC_ENABLE_MULTIPLE_MAPPING](../klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_AFC_ENABLE_MULTIPLE_MAPPING) macro.
Once enabled run [AFC_ADD_MAPPING](../klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_AFC_ADD_MAPPING) to add mappings
to a lane and [AFC_REMOVE_MAPPING](../klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_AFC_REMOVE_MAPPING) to remove
mappings from a lane. Both ADD/REMOVE macros can take a comma-separated list for the mapping value.

## Resetting Mappings
To reset mappings run [AFC_RESET_MAPPING](../klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_AFC_RESET_MAPPING), AFC
will then reset all macros back to a 1:1 mapping and if additional tools were added that exceed the normal amount of
T(n) macros, the additional T(n) macros will be removed and unregistered from klipper so they cannot be called unless
added back.

!!! note

    By default `AFC_RESET_MAPPING` also clears every lane's runout lane assignment. Pass `RUNOUT=no` (e.g.
    `AFC_RESET_MAPPING RUNOUT=no`) if you want to reset mappings without clearing runout lanes - useful if you're
    calling this from `PRINT_END` and still want infinite spool runout to work on the next print.
