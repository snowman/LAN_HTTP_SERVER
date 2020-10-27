#!/usr/bin/env bash

awk 'FNR==1 {print "@@@@,@@@@"} { print }' notes/*.txt | sed '1d' |\
sed 's/\r$//' |\
awk 'BEGIN { RS="\n@@@@,@@@@\n" }
           { print $0 > "output/" sprintf("%03d", NR) }'
