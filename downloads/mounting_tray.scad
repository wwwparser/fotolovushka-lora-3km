// Original generic tray, units mm. NOT a waterproof enclosure.
// Measure actual box/boards before printing. No supplier-specific hole pattern.
plate_x=110; plate_y=75; plate_z=3; hole_d=3.4; edge=7;
strap_width=4; strap_length=18;
$fn=36;
difference(){
  cube([plate_x,plate_y,plate_z]);
  for(x=[edge,plate_x-edge])for(y=[edge,plate_y-edge])
    translate([x,y,-1])cylinder(d=hole_d,h=plate_z+2);
  for(x=[20,55,90])for(y=[18,50])
    translate([x-strap_length/2,y,-1])cube([strap_length,strap_width,plate_z+2]);
}
