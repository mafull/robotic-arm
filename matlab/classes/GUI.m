classdef GUI < handle
   properties (Access = public)
       hFigure
       hLines
       hScatter
       hLabels
       
       hResetButton
       
       % External callback functions
       extCbResetButton
   end
   
   methods
       function obj = GUI()
           % Set up the figure
           obj.hFigure = figure('Visible', 'off');
           pbaspect([1 1 1]);
           view(37.5, 30);
           xlabel('x');
           ylabel('y');
           zlabel('z');
           hold on;
           axis equal;
           xlim([-500 500]);
           ylim([-500 500]);
           zlim([-100 500]);
           
           % Create buttons
           obj.hResetButton = uicontrol( ...
               obj.hFigure, ...
               'Style', 'pushbutton', ...
               'String', 'Reset', ...
               'Callback', @obj.cbResetButton );
       end
       
       function show(obj, points)
           % Show all the points
           obj.showN(points, size(points, 2));
       end
       
       function showN(obj, points, n)
           % Draw scatter plot
           obj.hScatter = scatter3( ...
               points(1,1:n), points(2,1:n), points(3,1:n) );
           
           % Draw lines
           obj.hLines = plot3( ...
               points(1,1:n), points(2,1:n), points(3,1:n), ...
               '-bo' );
           
           % Draw labels
           labelStrs = ['b'; num2str((0:5)','%d'); 'e'];
           labelStrs = labelStrs(1:n);
           obj.hLabels = text( ...
               points(1,1:n), points(2,1:n), points(3,1:n), ...
               labelStrs, 'horizontal', 'left', 'vertical', 'bottom' );
           
           % Make figure visible
           obj.hFigure.Visible = 'on';
       end
       
       function success = update(obj, points)
           % Update all the points
           success = obj.updateN(points, size(points, 2));
       end
       
       function success = updateN(obj, points, n)
           if (~ishandle(obj.hFigure))
               success = 0;
               return;
           end
           
           % Update scatter plot
           obj.hScatter.set( ...
               'XData', points(1,1:n), ...
               'YData', points(2,1:n), ...
               'ZData', points(3,1:n) );
           
           % Update line plot
           obj.hLines.set( ...
               'XData', points(1,1:n), ...
               'YData', points(2,1:n), ...
               'ZData', points(3,1:n) );
           
           % Update label plot
           for i = 1:n
               obj.hLabels(i).Position = points(1:3,i);
           end
           
           % Update figure data
           refresh(obj.hFigure);
           
           disp(points);
           
           success = 1;
       end
       
       function setResetCallback(obj, callback)
           obj.extCbResetButton = callback;
       end
       
       function cbResetButton(obj, src, event)
           if (isa(obj.extCbResetButton, 'function_handle'))
               points = obj.extCbResetButton();
               obj.update(points);
           end
       end
   end
end