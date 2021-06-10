# BingoGen
A utility to take weighted bingo goals and randomly generate a set of 25 goals for use in Bingosync

## Getting Started

- Install dependencies with `npm i`
- Edit the goals and weightings in `./data/weighted-goals.csv`
- Generate a BingoSync compatible JSON object with `npm start`

## Usage Guide

### Weightings

The weight field determines how likely a goal is to appear. Weights are relative - ie. an item with a weight of 20 is twice as likely to appear on a card as an item with a weight of 10. Weights can be any positive integer. If an invalid or zero weight is provided, it will default to a weight of 1.

## Compatibility

This module has been confirmed to work with NodeJS back to v8.x. It does not work with v6.x or earlier.
