#!/bin/bash

# Simple Interest Calculation Tool for AI Powered Emotion Sensing

echo "================================"
echo "Simple Interest Calculation Tool"
echo "================================"

echo -n "Enter principal amount: "
read principal

echo -n "Enter rate of interest: "
read rate

echo -n "Enter time period (in years): "
read time

# calculate simple interest using formula SI = (P * R * T) / 100
simple_interest=$(echo "scale=2; $principal * $rate * $time / 100" | bc)

echo "Simple Interest = $simple_interest"
