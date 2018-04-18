#!/usr/bin/env node

const rake = require('node-rake')

const exampleScrapedArticle = require('../data/example.scraped.articles.json')
const liipArticle = require('../data/example.scraped.articles2.json')
const acknowledgements = require('../data/phd2009.acknowledgements.json')

const articles = [
  `Server not found. Firefox can’t find the server at www.google.com. Check the address for typing errors such as ww.example.com instead of www.example.com If you are unable to load any pages, check your computer’s network connection.If your computer or network is protected by a firewall or proxy, make sure that Firefox is permitted to access the Web.`,
  `In this openCV tutorial, I will show you how to work with computer vision in Node.js. I will explain the basic principles of working with images using the open source library called OpenCV - with real-life use cases .Currently, I am working on my Master thesis in which I use React Native, neural networks, and the OpenCV computer vision library. Allow me to show you a few things that I have learned while working with OpenCV.Computer vision is a field of computer science, which focuses on retrieving data from images or videos using different algorithms. Computer vision is widely used, for example for motion tracking in security cameras, control of autonomous vehicles, identification of /searching for objects in a picture/video.
    Implementing algorithms of computer vision is a nontrivial task but there is a really good open source library called OpenCV which is being developed from 1999 until now. This library officially supports C, C ++, Python, and Java. Fortunately, JavaScript programmers led by Peter Braden started working on the interface library between the JavaScript and OpenCV called node-opencv. With the OpenCV library, we can create Node.js applications with image analysis. This library currently hasn't implemented all of OpenCV's features - especially the features of OpenCV 3 - but it is possible to use it nowadays.`,
  ...exampleScrapedArticle,
  ...liipArticle,
  // ...acknowledgements
  acknowledgements[0].slice(0, 3990),
  `Thank you to @jeanmonod and @isaline for their recent work on the website. BePark.eu took a look at our website few months ago and they didn't find any information about what we do (especially Xamarin tech for mobile). So we were *not a choice* for them. Recently, a friend that works at BePark.eu contacted me with an offer for us. What has changed? The website has been updated and now they've found the information they needed. So all the recent efforts are paying! Congrats.`,
  `The paper introduce in first place the supervised learning task and discuss the model selection techniques. The goal of a machine learning algorithm is to reduce the expected generalization error which is known as the risk. If we knew the true distribution P(x, y), risk minimization would be an optimization task solvable by an optimization algorithm. However, we do not know the true distribution but only a training set of samples. We need to convert it back into an optimization problem is to minimize the expected loss on the training set. Thus the empirical distribution defined by the training set replaces the true distribution. All above turns into the following statistical formula: Where $\\hat{R}(f)$ is an empirical estimate of the true risk R(f) of a model. And L(.) refers to a loss function, such as squared error loss (common loss function for regression), other common loss functions can be found via here. n is the number of samples. When n is large enough we have that：ERM (Empirical Risk Minimization) is an induction principle which relies on minimization of the empirical risk (Vapnik, 1999). The empirical risk minimizer $\\hat{f}$, is an empirical approximation of the target function, defined as: where F belongs to some class of functions, and referred as a model class, e.g. constant, linear methods, local regression methods (k-Nearest-Neighbors, kernel regression), splines, etc. ERM is a criterion to select the optimal function hat{f} from a set of functions F. The model class and ERM principle turns the learning problem into an optimization problem. The model class are considered candidate solutions function, while ERM principle provides us with a criterion to select the minimized function. There are a vast set of methods for optimization problems, two prominent methods are gradient descent and Newton’s method which are used in MART and XGBoost respectively. The author summarizes the common learning methods: The constant Linear methods Local regression methods Basis Function Expansions: explicit nonlinear terms, splines, kernel methods, etc… Adaptive basis function models: GAMs (Generalized Additive Models), neural networks, tree models, boosting Another machine learning concept is model selection, considering different learning methods and their hyper-parameters. The first question is always whether is it better to increase the complexity of a model And the answer always goes with the generalization performance of the model itself. As illustrated as the Fig. below, we may have a better performance (avoid under-fitting) while the model is more complex, but we are losing the generalization performance (overfitting)`
]

const app = articles
  .map(str => rake.generate(str)
    .map(e => e.trim())
    .slice(0, 3)
    .join(' | '))

// [ 'typing errors | pages check | proxy make',
// 'good open source library called OpenCV | open source library called OpenCV | Peter Braden started working',
// 'attend Kazakhstan peace talks Iran sticks | Chinese Foreign Ministry spokeswoman Hua Chunying | Taiwan President Tsai Ingwen angering Beijing'
// 'site building user experience security content authoring | development documentation marketing events organization supports… | Drupal Mentors DrupalCon Dublin 2016]
//  'student Craig Nevill Manning | Ukrainian German exchange student | Acknowledgements Ian Witten deserves' ]
// or
// 'Michael Poprat Alberto Pepe  Andras Csomai | Anna Huang  Craig Schock | Dmitry Lizorkin  Alan Aronson'

// 'recent work | months ago | Xamarin tech'
console.log(app)
