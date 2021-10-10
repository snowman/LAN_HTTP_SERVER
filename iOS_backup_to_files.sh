#!/usr/bin/env bash

# See below for export all notes at once
#   https://www.reddit.com/r/shortcuts/comments/cty1dk/retrieve_all_your_apple_notes/
# 1. Try to change chunk variable to some value, so notes count are the same in "Function Collect All Notes"
# 2. Change Text <repeat with each item in "notizen">
#     to @@ Last Modified Date @@\nRepeated Item
#     in "List all Notes Date Title"

# Usage:
#
# Export notes by using latest first in Shortcut app

# First time
#
# $ mv -iv PASTE_BIN notes/01.txt
#
# second time
# $ mv -iv PASTE_BIN notes/02.txt
#
# ... time
# $ mv -iv PASTE_BIN notes/NN.txt
#
# Lastest notes has smaller number, oldest one has greater number

# The "Shortcut" app only allow select FIRST 26 notes at a time.
# (NOTICE: it's select first, then sort)

# Explode notes to single text file one by one by separator
find notes -name "*.txt" | sort -n |\
xargs awk 'FNR==1 {print "@@@@,@@@@"} { print }' | sed '1d' |\
sed 's/\r$//' |\
awk 'BEGIN { RS="\n@@@@,@@@@\n" }
           { a[i++]=$0 }
     END   {
              while(i--)
                print a[i] > "output/" sprintf("%03d", NR - i)
           }'

# Run below when the export notes is oldest first, but that's NOT possible
# Because "Shortcut" app select notes first then sort
#
# awk 'BEGIN { RS="\n@@@@,@@@@\n" }
#            { print $0 > "output/" sprintf("%03d", NR) }'
