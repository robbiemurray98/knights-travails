// find all possible edges

// x, y
// x left to right
// y top to bottom

// try 
// x - 2, y + 1
// x - 2, y - 1

// x - 1, y - 2
// x + 1, y - 2

// x + 2, y + 1
// x + 2, y - 1

// x - 1, y + 2
// x + 1, y + 2

// neither x or y can equal < 0 or > 7



// a single vertex can have at most 7 edges



// class Node {
//     constructor(value){
//         this.value = value

//         this.topLeft = null
//         this.topRight = null

//         this.rightTop = null
//         this.rightBottom = null

//         this.bottomRight = null
//         this.bottomLeft = null
        
//         this.leftBottom = null
//         this.leftTop = null
//     }
// }

// starting vertex x, y[0, 0]

// list all edges from vertex

// the given argument to search has to be within the bounds of the graph

// findEdges([0, 0])

// function findEdges(giveVertex){ 
//     // check if it is not an array
//     const x = giveVertex[0]
//     const y = giveVertex[1]

//     if((checkVertex([x, y]))){
//         this.topLeft = checkVertex([x - 1, y + 2])
//         this.topRight = checkVertex([x + 1, y + 2])
//         this.leftTop = checkVertex([x - 2, y + 1])
//         this.rightTop = checkVertex([x + 2, y + 1])
//         this.leftBottom = checkVertex([x - 2, y - 1])
//         this.rightBottom = checkVertex([x + 2, y - 1])
//         this.bottomLeft = checkVertex([x - 1, y - 2])
//         this.bottomRight = checkVertex([x + 1, y - 2])
//     } else {
//         return new Error('Must be within 8x8 graph')
//     }

//     // write a function that check if a given vertex is within bounds and return a new node if so


//     function checkVertex(vertex){
//         const x = vertex[0]
//         const y = vertex[1]

//         if((x > -1 && x < 8) && (y > -1 && y < 8)){
//             const newNode = new Node([x, y])
//             return newNode
//         } else {
//             return null
//         }
//     }

// }


// rethink
// two steps forward and one step to the side
// one step forward and two steps to the side 
// can we generate one from the other
// -+2 -+1
// 




class Node{
    constructor(vertex){
        this.vertex = vertex
        this.parent = null
    }
}

// create an algorithm that will explicity explore all possible edges
// create level order traversal
// search through each edge of vertex
// use in order traversal to find the edges of each vertex

// you dont need to create a node for each edge

function isOnBoard(vertex){
    const x = vertex[0]
    const y = vertex[1]

    if(x <= 7 && y <= 7 && x >= 0 && y >= 0){
        return true
    } else {
        return false
    }
}

function helper(vertex){
    const x = vertex[0]
    const y = vertex[1]

    // all possible edges
    const edges = []

    if((x != null && y != null)){
        edges.push([x - 1, y + 2])
        edges.push([x + 1, y + 2])
        edges.push([x - 2, y + 1])
        edges.push([x + 2, y + 1])
        edges.push([x - 2, y - 1])
        edges.push([x + 2, y - 1])
        edges.push([x - 1, y - 2])
        edges.push([x + 1, y - 2])
    } else {
        return new Error('Must be within 8x8 graph')
    }

    // console.log(edges)

    // create new arr
    // push valid coordinates to new arr

    const validEdges = []

    for(let i = 0; i < edges.length; i++){
        // console.log(i)

        const x = edges[i][0]
        const y = edges[i][1]
        // console.log(x, y)

        if(x <= 7 && y <= 7 && x >= 0 && y >= 0){
            validEdges.push(edges[i])
        }
    }

    return validEdges


}


function searchGraph(start, target){

    if(isOnBoard(start) === false){
        return new Error('Start must be within a 7x7 grid.')
    } else if(isOnBoard(target) === false){
        return new Error('Target must be within a 7x7 grid.')
    }

    const visited = []

    const path = []


    const startNode = new Node(start)

    function findTarget(queue){

        if(queue.length === 0 && queue[0] == undefined){
            return
        }

        const givenNode = queue.shift()

        const givenVertex = givenNode.vertex
        const x = givenVertex[0]
        const y = givenVertex[1]

        const targetX = target[0]
        const targetY = target[1]

        let isVisited = visited.some((e) => x === e[0] && y === e[1])

        if(x === targetX && y === targetY){
            let current = givenNode
            while(current != null){
                path.unshift(current.vertex)
                current = current.parent
            }
            return path
        } else {
            if(isVisited === false){
                visited.push(givenVertex)
                const possibleMoves = helper(givenVertex)
                possibleMoves.forEach((e) => {
                    const node = new Node(e)
                    node.parent = givenNode
                    queue.push(node)
            })
                // create parent node add paren pointer to e
            } 

            findTarget(queue)
            return path
        }
    }

    findTarget([startNode])

    console.log(`You made it in ${path.length} moves! Here's your path:`)
    path.forEach((e) => {
        console.log(e)
    })

    return 

}


searchGraph([5, 6], [0, 3])
// searchGraph([0, 0], [4, 3])

// console.log(helper([0, 0]))


// start on a node
// find all possible moves
// search through possible nodes breadth first
// loop through valid edges 
// use find valid edges function on each

// how would this work recursively

// create a queue?

// each possible move is placed in the queue

// search queue[0]
// search queue[1]...
// reach end of queue
// add secondary array to queue to larger queue
// the secondary queue contains all the node from queue[0]...
// delete queue[0]


