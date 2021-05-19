#!/usr/bin/env bash

find notes -name "*.txt" | sort -n |\
xargs awk 'FNR==1 {print "@@@@,@@@@"} { print }' | sed '1d' |\
sed 's/\r$//' |\
awk 'BEGIN { RS="\n@@@@,@@@@\n" }
           { a[i++]=$0 }
     END   {
             while(i--)
               print a[i] > "output/" sprintf("%03d", NR - i)
           }'

# { print $0 > "output/" sprintf("%03d", NR) }
