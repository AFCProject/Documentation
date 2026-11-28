# Drawing tool_stn cutaways for a toolhead

The `tool_stn` cutaways on the [Toolhead Variable Calculation](calculation.md) page were drawn from CAD for one
toolhead: a FilamATrix Stealthburner with a Clockwork 2 and a Rapido V2 UHF. This page describes how they were made,
so the same drawings, and a predicted `tool_stn`, can be produced for another toolhead. At the end is a prompt that
can be given to an AI coding agent to do the work.

The drawings give a starting value. They do not replace the tuning steps on the calculation page: a prediction
should always be confirmed on the printer.

## The script that drew them

[`tools/tool_stn_cutaways.py`](https://github.com/4o66/afc-xray/blob/main/tools/tool_stn_cutaways.py) in
[afc-xray](https://github.com/4o66/afc-xray) draws all three images from afc-xray's meshes of the FilamATrix CAD.
It needs Python 3 and nothing else, plus Inkscape for the PNGs:

```
git clone https://github.com/4o66/afc-xray && cd afc-xray
python3 tools/tool_stn_cutaways.py --png-width 1800
```

The images are written to `build/tool_stn/`. `tools/guidler_stop.py` in the same folder works out where a ramming
load stalls at the gears (step 4 below). For another toolhead, the script is a starting point: its inputs (part
numbers, heights, cut settings) are set near the top. The method below is what it does.

## What the drawings show

Each image is a section through the filament path, with three panels at the same scale:

1. **After the cut.** The leftover filament (the remnant) is in the hotend, with empty space below it at the nozzle
   end. The new filament is out of view above.
2. **A.** The new filament's tip has just reached the top of the remnant.
3. **B.** The new filament has pushed the remnant down until the hotend is full and the filament is on the verge of
   extruding. This is what `tool_stn` should reach.

In panels A and B a dimension shows `tool_stn`, measured from the load stop to the new filament's tip.

## What you need

- A STEP model of the toolhead's filament path: the extruder body, the gears and guidler, the toolhead sensors (or
  their switch pockets and balls), the cutter, and the hotend with its nozzle.
- Your sensor setup: `pin_tool_start` only, `pin_tool_start` and `pin_tool_end`, or ramming
  (`pin_tool_start: buffer`).
- Your cut settings: `variable_retract_length`, `variable_pushback_length`, and any toolchange retract your slicer
  adds.
- `short_move_dis` from your AFC config (10mm by default), if `pin_tool_end` is defined.

## Method

### 1. Set up the geometry

Convert the STEP parts to triangle meshes (FreeCAD, CadQuery or trimesh can all do this). Place them so the filament
axis runs along Z, and set Z = 0 at the nozzle face, the flat face around the orifice. Every height below is measured
up from there.

### 2. Cut the section

Cut every part with a plane through the filament axis, chain the crossing segments into closed outlines, and fill
each one. Offset the plane about 0.001mm so that no vertex lies exactly on it.

### 3. Find the reference heights

Read these off the meshes:

- The nozzle face (Z = 0) and the bore up through the nozzle, heat break and liner.
- The cut plane: the middle of the cutter blade where it crosses the filament path.
- Each toolhead sensor's trigger point. The ball center is a reasonable first estimate, but a real switch triggers
  partway through the ball's travel. On the toolhead these drawings come from, `pin_tool_end` was measured to clear
  about 2mm above its ball center.
- The gear nip: the height of the gear axes.
- Where the bowden tube seats: the first height, coming down the tube bore, where the bore narrows below the tube's
  outside diameter.

### 4. Find the load stop for your sensor setup

This is where AFC stops the load before the `tool_stn` move:

- **`pin_tool_start` only:** the `pin_tool_start` trigger point.
- **`pin_tool_start` and `pin_tool_end`:** AFC moves `short_move_dis` at a time after `pin_tool_start` triggers and
  checks `pin_tool_end` between moves. The stop is `pin_tool_start` plus the smallest whole number of steps that
  reaches `pin_tool_end`. On the drawn toolhead that is three steps, 30mm.
- **Ramming:** where the filament tip stalls against the stationary gears. With no filament in the gears the spring
  swings the guidler in until it stops, often on the gear teeth meshing. Close the guidler to that stop, then find the
  height where a flat-ended filament tip on the filament axis first touches both gears. This is usually a little above
  the nip. Treat it as an estimate: the real stall depends on the condition of the tip.

### 5. Place the remnant after the cut

Follow your cut macro's moves. On a cutter toolhead such as the FilamATrix (the cutter sits between the extruder and
the hotend), with the default `Cut.cfg`:

- The retract lifts the whole filament by `variable_retract_length`, leaving that much empty space at the nozzle end.
- The blade cuts the filament at the cut plane.
- The pushback pushes the remnant back down by `variable_pushback_length`.
- A slicer toolchange retract, if any, lifts it again.

So the empty space at the nozzle end is retract - pushback + slicer toolchange retract, and the remnant's top is the
cut plane - pushback. The drawings also allowed 1mm for the tip tearing away during the cut, which raises both ends
by 1mm. Check your own macro's order of moves before you use these formulas.

### 6. Work out A and B

- A = load stop - remnant top.
- B = A + the empty space at the nozzle end.

B does not depend on the bore diameter. The empty space holds exactly the volume of filament the retract withdrew,
so it takes the same length of filament to refill it, whatever the bore's width.

### 7. Draw and label

Draw the three panels side by side at the same Z scale, with the filament in a color that stands out from the parts.
Label the parts and the reference heights. Keep labels readable:

- A label must not cover another label's leader line, the filament, or any part section.
- Leader lines may cross part outlines, but they should be thinner than the outlines and a neutral color.
- If the labels do not fit under those rules, use numbered markers with a table beside the image.

Check these rules in code before you export the image, rather than by eye.

### 8. Confirm on the printer

Run the tuning steps on the [calculation page](calculation.md), starting from the predicted B. If the measured value
differs, put it on the image as a footnote to the prediction. On the drawn toolhead both switch setups measured 1.5mm
longer than predicted, most likely because the sensors trigger above their ball centers, and ramming measured 5mm
longer, because the tip stalled higher than the model put it.

## Known limits

- The model treats the remnant and the new filament as solid columns that move as a whole. Melting, back-flow and
  the shape of the cut tip are not modeled.
- Parts that are not in the STEP model (a PTFE liner, the bowden tube) have to be drawn from their known sizes.
- CAD is nominal. Real parts, and how far tubes are pushed in, differ slightly.

## Prompt for an AI coding agent

Fill in the bracketed values, attach or point to the STEP files, and give the agent the text below.

```text
Draw tool_stn cutaways for an AFC toolhead from CAD, and predict tool_stn.

Inputs:
- STEP model(s) of the toolhead filament path: [paths]. They include the extruder body, gears and guidler, toolhead
  sensors, cutter and hotend.
- Sensor setup(s) to draw: [pin_tool_start only / pin_tool_start + pin_tool_end / ramming].
- variable_retract_length [20], variable_pushback_length [10], slicer toolchange retract [0], short_move_dis [10].
- The cut macro: [path to Cut.cfg, or "AFC default"].

Method (follow https://afcproject.github.io/Documentation/toolhead/tool_stn_cutaways/ ; the reference
implementation for a FilamATrix CW2 is tools/tool_stn_cutaways.py in https://github.com/4o66/afc-xray ):
1. Convert the STEP parts to triangle meshes. Put the filament axis on Z and Z = 0 at the nozzle face.
2. Section every part with a plane through the filament axis (offset about 0.001 mm), chain the crossing segments
   into closed outlines, and fill each with a hatch per material.
3. From the meshes, report: the nozzle face, the bore through the hotend, the cut plane, each sensor ball center,
   the gear nip, and the bowden tube seat. Say which values come from the meshes and which are assumed.
4. Find the load stop: pin_tool_start trigger (start only); pin_tool_start + the smallest whole number of
   short_move_dis steps that reaches pin_tool_end (start + end); for ramming, close the guidler to its stop and find
   where a flat-ended 1.75 mm filament tip on the axis first touches both gears.
5. Trace the cut macro's moves to place the remnant. With AFC's default macro: empty space at the nozzle end =
   retract - pushback + slicer retract, remnant top = cut plane - pushback, plus 1 mm for the tip tearing. Check
   the macro's actual order of moves first.
6. A = load stop - remnant top. B = A + empty space. tool_stn should be B.
7. Draw three panels per setup at one Z scale: after the cut, A (touching the remnant), B (hotend full, verge of
   extruding), with tool_stn dimensioned from the load stop. Do not draw sensors or balls a setup does not have.
8. Check in code before writing any image: no label box overlaps a part section, the filament, another label or
   another label's leader line; leader lines are thinner than part outlines and neutral in color. If labels cannot
   fit, use numbered markers with a table.
9. Export SVG, and PNG at about 1800 px wide. Report A and B for each setup, every assumption, and the CAD license.

Do not present predictions as measurements. Mark the predicted tool_stn on each image so a measured value can be
added as a footnote after testing on the printer.
```
