The AFC-Klipper-Add-On is a powerful tool designed to enhance the functionality of your multicolor system. It provides 
a seamless integration with Klipper, allowing for advanced control and monitoring of your 3D printing process while 
using multiple filaments. This documentation will guide you through the installation, configuration, and usage of
the AFC-Klipper-Add-On, ensuring you can make the most of its features.

This documentation is intended for users who are familiar with Klipper and have a basic understanding of 3D printing 
and the Klipper ecosystem. If you're new to Klipper or 3D printing, we recommend starting with the Klipper documentation and familiarizing yourself
with the basics before diving into the AFC-Klipper-Add-On.

The latest release of our software along with all release notes / CHANGELOG can be found:

 - [Releases](https://github.com/AFCProject/AFC-Klipper-Add-On/releases)
 - [CHANGELOG](https://github.com/AFCProject/AFC-Klipper-Add-On/blob/main/CHANGELOG.md)

If this is your first time installing AFC-Klipper-Add-On, head to the
[**Initial Startup Guide**](initial-startup/01-overview.md). It will walk you through assembly, flashing,
installation, and initial configuration for your specific unit type.

!!! note

    Throughout this documentation, when we refer to Klipper, it also applies to forks such as Kalico, unless 
    otherwise specified.

## Supported Filament Changers

AFC-Klipper-Add-On supports a variety of filament changer hardware, and multiple units (including
different types) can be combined on the same printer. See
[Additional Units](additional-units/index.md) for details on installing more than one unit.

- [**BoxTurtle**](configuration/AFC_UnitType_1.cfg.md#afc_boxturtle-unit_name-section): The original
  Armored Turtle filament changer unit. Other unit types below inherit most of their configuration
  from BoxTurtle.
- [**HTLF**](configuration/AFC_UnitType_1.cfg.md#afc_htlf-unit_name-section): Happy Turtle Lettuce
  Feeder unit.
- [**NightOwl**](configuration/AFC_UnitType_1.cfg.md#afc_nightowl-unit_name-section): BoxTurtle-style
  unit variant.
- [**QuattroBox**](configuration/AFC_UnitType_1.cfg.md#afc_quattrobox-unit_name-section): BoxTurtle-style
  4-lane unit.
- [**ViViD**](configuration/AFC_UnitType_1.cfg.md#afc_vivid-unit_name-section) /
  [**HTLF2-Claymore**](configuration/AFC_UnitType_1.cfg.md#afc_claymore-unit_name-section): BTT ViViD
  and HTLF2-Claymore units, which share the same macros and configuration options.
- [**EMU**](configuration/AFC_UnitType_1.cfg.md#afc_emu-unit_name-section): EMU unit type.
- [**OpenAMS**](configuration/AFC_UnitType_1.cfg.md#afc_openams-unit_name-section): Driven by an
  [**AFC_OAMS**](configuration/AFC_UnitType_1.cfg.md#afc_oams-unit_name-section) hardware controller
  section.

In addition to these standalone units, AFC also supports [**toolchangers**](toolchanger/overview.md),
including multi-toolhead setups managed through klipper-toolchanger, standalone toolheads (with or
without IDEX), and the [**Snapmaker U1**](toolchanger/snapmaker.md), which ships with
AFC-Klipper-Add-On built into its extended firmware.

## Organization

The documentation is organized into several sections, each covering a specific aspect of the AFC-Klipper-Add-On.

- [**Installation**](installation/getting-started.md): Step-by-step instructions on how to install the 
  AFC-Klipper-Add-On on your system.
- [**Configuration**](configuration/configuration_overview.md): Detailed information on how to configure the 
  AFC-Klipper-Add-On to work with your specific setup.
- [**Commands**](klipper/commands.md): Information on how to use the built-in macros and commands within the 
  AFC-Klipper-Add-On module.
- [**Troubleshooting**](troubleshooting/troubleshooting.md): Common issues and their solutions, as well as tips for 
  diagnosing and resolving 
  problems with the AFC-Klipper-Add-On.

Throughout the documentation, you'll find code snippets, configuration examples, and troubleshooting tips to help you get the most out of the AFC-Klipper-Add-On.

A few things to keep in mind as you read through the documentation:

You may come across items in the documentation in the following tabbed format:

-----

=== "First Tab"
    This is the first tab of a tabbed section. It contains information about the first option.

=== "Second Tab"
    This is the second tab of a tabbed section. It contains information about the second option or feature. It can 
    also be used to provide more in-depth information about a specific topic or feature.

-----

Annotations are also used throughout the documentation to provide additional information or context. These annotations 
are typically used to provide tips, warnings, or additional information that may be helpful to the reader. They are 
typically formatted as follows and can be expanded or collapsed by clicking on the title:

??? tip
    This is a tip annotation. 

??? warning
    This is a warning annotation. 

??? info
    This is an info annotation. 

??? note
    This is a note annotation. 

!!!note "Providing Feedback"

    We welcome your feedback on this documentation. If you have any comments (good or bad), simply click on the 
    Happy Turtle or Angry Turtle icons at the bottom of any page to provide feedback.

<center>[![Join me on Discord](https://discord.com/api/guilds/1495561254293471282/widget.png?style=banner2)](https://discord.gg/z2tgWEnfDT)</center>
