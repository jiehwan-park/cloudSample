#!/bin/sh

echo "Sample app install"
pkgcmd -i -t tpk -p /home/owner/org.example.animation*.tpk
pkgcmd -i -t tpk -p /home/owner/org.example.calculator*.tpk
pkgcmd -i -t tpk -p /home/owner/org.example.ddktest*.tpk
pkgcmd -i -t tpk -p /home/owner/org.example.glbasicrenderer*.tpk
pkgcmd -i -t tpk -p /home/owner/org.example.player*.tpk
pkgcmd -i -t tpk -p /home/owner/org.example.camera*.tpk

exit