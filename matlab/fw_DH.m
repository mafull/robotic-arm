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
arm.addJoint(0,     s_b,   0,     0,  0); % b
arm.addJoint(0,     s_0,   0,     0, 90); % 0
arm.addJoint(0,       0,   0,   s_1,  0); % 1
arm.addJoint(0,       0,   180,   0, 90); % 2
arm.addJoint(0, s_2+s_3,   180,   0, 90); % 3
arm.addJoint(0,       0,   180,   0, 90); % 4
arm.addJoint(0, s_4+s_5,   180,   0,  0); % 5
positions = arm.update(zeros(1,7));

% Create GUI object and show initial arm state
close all;
gui = GUI();
gui.setResetCallback(@arm.reset);
gui.show(positions);


%return;
iterations = 100;

for n = 1:iterations
    angle = (360*(n/iterations)*1.3);
    disp(angle);
    positions = arm.update([0; angle; 0; 0; 0; 0; 0;]);
    gui.update(positions);
    
    pause(0.05);
    %disp(n);
end