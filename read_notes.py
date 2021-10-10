#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import os

dest = "notes"
if os.path.exists(dest) and os.path.isdir(dest):
    if not os.listdir(dest):
        print("Directory is empty")
    else:
        print("Directory is not empty")
        import sys
        sys.exit(1)

with open("PASTE_BIN", "r", encoding='utf-8') as f:
    text = ''.join(f.readlines()[1:]).strip()
    notes = re.split('@@ \d{4}-\d{2}-\d{2} @@', text)
    notes = list(filter(lambda x: len(x), notes))
    print("Exporting {} notes".format(len(notes)))
    for idx, note in enumerate(notes):
        space = ("  " if ((idx+1) % 25 == 0 and (idx+1) % 50 != 0) else "")
        number_newline = (str(idx+1).rjust(4, ' ') + "\n" if idx !=0 and (idx+1) % 50 == 0 else "")
        print("." + space + number_newline, end='')
        filename = os.path.join(dest, str(idx+1).rjust(3, '0'))
        print(note.strip(), file=open(filename, "w", encoding='utf-8'))
