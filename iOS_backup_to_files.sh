#!/usr/bin/env bash

# First time
#
# $ mv -iv PASTE_BIN notes/01.txt
#
# second time
# $ mv -iv PASTE_BIN notes/02.txt
#
# ... time
# $ mv -iv PASTE_BIN notes/NN.txt

# The "Shortcut" app only allow select FIRST 26 notes at a time.
# (sort then select, so each time the order is remain unchanged.)

# Think oldest has smaller number, lastest has greater number, like (1, 2, 3, ..., N) etc

# The export notes is oldest first
find notes -name "*.txt" | sort -n |\
xargs awk 'FNR==1 {print "@@@@,@@@@"} { print }' | sed '1d' |\
sed 's/\r$//' |\
awk 'BEGIN { RS="\n@@@@,@@@@\n" }
           { print $0 > "output/" sprintf("%03d", NR) }'

# If the file is lastest first, the code below reverse order after read all.
#
# awk 'BEGIN { RS="\n@@@@,@@@@\n" }
#            { a[i++]=$0 }
#      END   {
#              while(i--)
#                print a[i] > "output/" sprintf("%03d", NR - i)
#            }'
