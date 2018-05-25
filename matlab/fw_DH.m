% --- Configuration ---
% Lengths (mm)
s_b = 30;
s_0 = 40;
s_1 = 300;
s_2 = 200;
s_3 = 120;
s_4 = 30;
s_5 = 30;

% Create and configure RobotArm object and set initial state
arm = RobotArm();
arm.addJoint(0, s_b,   0,   0,   0);
arm.addJoint(0, s_0,   0,   0,  90);
arm.addJoint(0,   0,   0, s_1,   0);
arm.addJoint(0,   0,   0, s_2,   0);
arm.addJoint(0, s_3,   0,   0, 270);
arm.addJoint(0,   0,   0,   0,  90);
arm.addJoint(0, s_5,   0,   0,   0);
positions = arm.update([0; 0; 0; 0; 0; 0; 0;]);

% Create GUI object and show initial arm state
gui = GUI();
gui.show(positions);


iterations = 100;

for n = 1:iterations
    positions = arm.update([0; (360*(n/iterations)); 0; 0; 0; 0; 0;]);
    gui.update(positions);
    
    pause(0.05);
    disp(n);
end