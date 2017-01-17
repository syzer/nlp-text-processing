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
    acknowledgements[0].slice(0, 3990)
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

console.log(app)
