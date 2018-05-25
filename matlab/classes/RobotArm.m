classdef RobotArm < handle
    properties (Access = public)
        jointCount = 0;       
        
        jointType_all
        
        d_all
        theta_all
        a_all
        alpha_all
        
        T_all
        
        jointParameter_all
        position_all = [0; 0; 0; 1];
    end
    
    methods
        function obj = RobotArm()
            
        end
        
        function setOrigin(obj, origin)
            % Update position 1 (origin)
            obj.position_all(:,1) = origin;
        end
        
        function addJoint(obj, isPrismatic, d, theta, a, alpha)
            % Increment joint count
            obj.jointCount = obj.jointCount + 1;
            
            % Set revolute/prismatic
            obj.jointType_all(obj.jointCount) = isPrismatic;
            
            % Set initial joint parameter to 0
            obj.jointParameter_all(obj.jointCount) = 0;
            
            % Store distances
            obj.d_all(obj.jointCount) = d;
            obj.a_all(obj.jointCount) = a;
            
            % Store angles in radians
            obj.theta_all(obj.jointCount) = deg2rad(theta);
            obj.alpha_all(obj.jointCount) = deg2rad(alpha);
            
            % Update transformation matrices
            obj.updateMatrices();
            obj.updatePositions();
        end
        
        function updateMatrices(obj)
            for i = 1:obj.jointCount
                % Grab joint configuration
                d = obj.d_all(i);
                theta = obj.theta_all(i);
                a = obj.a_all(i);
                alpha = obj.alpha_all(i);
                
                % Add joint parameter
                if obj.jointParameter_all == 0
                    % Revolute joint
                    theta = theta + obj.jointParameter_all(i);
                else
                    % Prismatic joint
                    d = d + obj.jointParameter_all(i);
                end
                
                % Create H matrix
                H = [
                    cos(theta), -sin(theta)*cos(alpha), sin(theta)*sin(alpha), a*cos(theta);
                    sin(theta), cos(theta)*cos(alpha), -cos(theta)*sin(alpha), a*sin(theta);
                    0, sin(alpha), cos(alpha), d;
                    0, 0, 0, 1 ];
                
                % Update T matrix
                if (i == 1)
                    obj.T_all(:,:,i) = H;
                else
                    obj.T_all(:,:,i) = obj.T_all(:,:,i-1) * H;
                end
            end
        end
        
        function updatePositions(obj)
            % Calculate new positions using T matrices
            for i = 1:obj.jointCount
                obj.position_all(:,i+1) = obj.T_all(:,:,i) * obj.position_all(:,1);
            end            
        end
        
        function positions = update(obj, jointParameters)
            % Update joint parameters
            for i = 1:obj.jointCount
                if obj.jointType_all(i) == 0
                    obj.jointParameter_all(i) = deg2rad(jointParameters(i));
                else
                    obj.jointParameter_all(i) = jointParameters(i);
                end
            end
            
            % Update T matrices using new the joint parameters
            obj.updateMatrices();
            
            % Update the joint positions
            obj.updatePositions();
            
            % Return new positions
            positions = obj.position_all;
        end
    end
end