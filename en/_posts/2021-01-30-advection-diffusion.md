---
title: "Solving the advection-diffusion equation in a couple of lines of code"
categories: 
    - MATLAB
    - Numerical solvers
    - PDE
---

Let's implement the advection equation in the form (1):

<img src="https://latex.codecogs.com/gif.latex?\frac{\partial&space;u}{\partial&space;t}-\nabla&space;\cdot&space;(D\nabla&space;u)+\nabla&space;\cdot&space;(vu)=R"/>

where:
* <img src="https://latex.codecogs.com/gif.latex?\inline&space;u"/> is the species concentration, and the variable in our equation; </li>
* <img src="https://latex.codecogs.com/gif.latex?\inline&space;D"/> is the <em>diffusivity;</em> </li>
* <img src="https://latex.codecogs.com/gif.latex?\inline&space;v"/> is the <em>velocity field</em>; </li>
* <img src="https://latex.codecogs.com/gif.latex?\inline&space;R"/> describes <em>sources</em> or sinks, and may be a function of <img src="https://latex.codecogs.com/gif.latex?\inline&space;u"/> and other parameters.

In the above equation, we have the following terms:

* <img src="https://latex.codecogs.com/gif.latex?\inline&space;\nabla&space;\cdot&space;(D\nabla&space;u)"/> describes <em>diffusion;</em>
* <img src="https://latex.codecogs.com/gif.latex?\inline&space;\nabla&space;\cdot&space;(vu)"/> describes <em>convection.</em>

``` Octave
model = createpde();
```

Let's consider a simple geometry:

<pre><code class="language-matlab:Code">model.importGeometry('PlateHolePlanar.stl');
figure();
pdegplot(model, 'EdgeLabels', 'on');
</code></pre>

<img src="http://picciau.net/wp-content/uploads/2021/01/figure_0.png" alt="http://picciau.net/wp-content/uploads/2021/01/figure_0.png
" />

MATLAB expects an equation of the form:

<img src="https://latex.codecogs.com/gif.latex?m\frac{\partial^2&space;u}{\partial&space;t^2&space;}+d\frac{\partial&space;u}{\partial&space;t}-\nabla&space;\cdot&space;(c\nabla&space;u)+au=f"/>

so we'll have to reorder (1) to:

<img src="https://latex.codecogs.com/gif.latex?\frac{\partial&space;u}{\partial&space;t}-\nabla&space;\cdot&space;(D\nabla&space;u)=R-\nabla&space;\cdot&space;(vu)"/>

<pre><code class="language-matlab:Code">diffusivity = 1e-2;
velocity = [0.1, 0.1];
source = 0;
specifyCoefficients(model, ...
    "m", 0, ...
    "d", 1, ...
    "c", diffusivity, ...
    "a", 0, ...
    "f", @(x, s) iRightHandSide(x, s, velocity, source));
</code></pre>

Apply an initial condition on the central circle

<pre><code class="language-matlab:Code">initialConcentration = 1;
model.setInitialConditions(0);
model.setInitialConditions(initialConcentration, 'edge', 5);
</code></pre>

Apply boundary conditions:

<pre><code class="language-matlab:Code">model.applyBoundaryCondition('neumann', ...
    'edge', 1:4, 'q', 0, "g", 0);
</code></pre>

Generate the mesh and show what it'll look like

<pre><code class="language-matlab:Code">mesh = generateMesh(model, "Hmax", 0.5);
figure();
pdeplot(model);
</code></pre>

<img src="http://picciau.net/wp-content/uploads/2021/01/figure_1.png" alt="http://picciau.net/wp-content/uploads/2021/01/figure_1.png
" />

Resolve the PDE:

<pre><code class="language-matlab:Code">timeSteps = iTimeSteps(60, 10);
result = solvepde(model, timeSteps);
</code></pre>

Show trend at some points of the solution

<pre><code class="language-matlab:Code">figure();
subplot(2, 2, 1);
iShapshot(model, result, timeSteps, 1, initialConcentration);

subplot(2, 2, 2);
iShapshot(model, result, timeSteps, round(numel(timeSteps)*1/3), initialConcentration);

subplot(2, 2, 3);
iShapshot(model, result, timeSteps, round(numel(timeSteps)*2/3), initialConcentration);

subplot(2, 2, 4);
iShapshot(model, result, timeSteps, round(numel(timeSteps)*0.99), initialConcentration);
</code></pre>

<img src="http://picciau.net/wp-content/uploads/2021/01/figure_2.png" alt="http://picciau.net/wp-content/uploads/2021/01/figure_2.png
" />

Visualise one particular snapshot

<pre><code class="language-matlab:Code">figure()
progressValue = 61;
numStep = round(numel(timeSteps)*progressValue/100);
iShapshot(model, result, timeSteps, numStep, initialConcentration);
</code></pre>

<img src="http://picciau.net/wp-content/uploads/2021/01/figure_3.png" alt="http://picciau.net/wp-content/uploads/2021/01/figure_3.png
" />

Export the solution as a video

<pre><code class="language-matlab:Code">iExportResultsAsVideo("result.mp4", model, result, timeSteps, initialConcentration);
</code></pre>

[video width="560" height="420" mp4="http://picciau.net/wp-content/uploads/2021/01/result.mp4"][/video]

<h1>Helper functions</h1>

<pre><code class="language-matlab:Code">function f = iRightHandSide(~, state, velocity, source)
ux = state.ux;
uy = state.uy;
v = velocity;
convection = ux*v(1)+uy*v(2);
f = source - convection ;
end

function ts = iTimeSteps(sec, varargin)
if nargin==1
    stepsPerSecond = 60;
else
    stepsPerSecond = varargin{1};
end
nSteps = sec*stepsPerSecond;
ts = linspace(0, sec, nSteps);
end

function iShapshot(model, solution, timeSteps, stepNumber, maxConcentration)
currSolution = solution.NodalSolution(:, stepNumber);

pdeplot(model, ...
    "XYData", currSolution, ...
    "ColorMap", "jet", ...
    "ColorBar", "off";);
title("Time " + compose("%2.3f", timeSteps(stepNumber)));
colorbar();
caxis(gca(), [0, maxConcentration]);
end

function iExportResultsAsVideo(fileName, model, result, timeSteps, maxConcentration)
h = figure();
numSteps = numel(timeSteps);

% create the video writer
writerObj = VideoWriter(fileName, "MPEG-4");
writerObj.FrameRate = 60;

open(writerObj);
for k = 1:numSteps
    iShapshot(model, result, timeSteps, k, maxConcentration);

    % Capture the plot as an image
    frame = getframe(h);
    writeVideo(writerObj, frame);
end
close(writerObj);
end
</code></pre>