// Parametric opaque sleeve to isolate lens from IR window. Measure optics first.
inner_d=16;wall=2;height=15;flange_d=28;flange_z=2;
$fn=80;
difference(){
 union(){cylinder(d=inner_d+2*wall,h=height);cylinder(d=flange_d,h=flange_z);}
 translate([0,0,-1])cylinder(d=inner_d,h=height+2);
}
