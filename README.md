##Instruction
Please download the patch according to your target
There is a patch related to demo.
We checked the functionality based on the binary of tizen-common-artik_20161007.97 version.
Please refer to below path to get the version.
* http://download.tizen.org/releases/weekly/tizen/common_artik/tizen-common-artik_20161007.97/  => it will be updated and lasted.
* http://download.tizen.org/snapshots/tizen/common_artik/tizen-common-artik_20161007.97/ => it will be lasted for 2 weeks

Here is steps how to run patches
<pre>
1) find script (patch-demo_artik5 / patch-demo_artik10)

2) run patch according to target board
 : for artik5
 $ sudo ./patch-demo_artik5
=> if the patch is done, it can be rebooted automatically.

 :for artik10
 $ sudo ./patch-demo_artik10
=> if the patch is done, it can be rebooted automatically.
</pre>

By the way, unleass install driver(ddk...) demo patch will not be worked.
