const delay = 1;
function Sorter(container) {
    this.container = container

    this.build = function(minHeight, maxHeight, width=10) {
        this.container.innerHTML = ""
        this.width = width + 2//Plus margin
        this.amount = (this.container.offsetWidth / this.width) - 1
        this.maxHeight = maxHeight
        this.minHeight = minHeight
        for(let a = 0; a < this.amount; a++) {
            let height = random(this.minHeight, this.maxHeight)
            this.container.innerHTML += "<div class='block' style='height: " + height + "px'></div>"
        }
        this.blocks = this.container.getElementsByClassName("block")
        document.getElementById("block-container").style.height = maxHeight + "px";
    }
    this.bubbleSort = (callback=null) => {
        bubbleSort(this.blocks, callback)
    };
    this.selectionSort = (callback=nul) => {
        selectionSort(this.blocks, callback)
    }
}

function selectionSort(blocks, callback=null, start = 0, a = 0, smallest = null) {
    if(blocks.length < 2) return;
    var block = blocks[a]
    block.classList.add("yellow")
    if(smallest == null) smallest = block
    if(block.offsetHeight < smallest.offsetHeight) {
        smallest = block
    }
    if(a == blocks.length - 1) {
        //Last block
        blocks[0].parentNode.insertBefore(smallest, blocks[start])
        smallest.classList.add("active")
        start++
        a = start
        smallest = blocks[a]
    } else {
        a++
    }

    if(start < blocks.length) {

        setTimeout(function() {
            block.classList.remove("yellow")
            selectionSort(blocks, callback, start, a, smallest)
        }, delay)
    } else {
        if(typeof callback == "function") callback();
        block.classList.remove("yellow")
    }

}

function bubbleSort(blocks, callback=null, a = 0, order = true) {
    if(blocks.length < 2) return;
    var block = blocks[a]
    var height = block.offsetHeight
    var _block = blocks[a + 1]
    var _height = _block.offsetHeight
    block.classList.add("yellow")
    if(height > _height) {
        order = false;
        // _block.style.height = height + "px"
        // block.style.height = _height + "px"
        // block.classList.add("active")

        const newEl = block.cloneNode(true);
        const _newEl = _block.cloneNode(true)
        //Swap places
        block.parentNode.replaceChild(newEl, _block)
        block.parentNode.replaceChild(_newEl, block)
    }

    if(a >= blocks.length - 2) {
        //Last one
        blocks[blocks.length - 1].classList.remove("yellow") //BUG
        if(order) {
            //All in order
            block.classList.remove("yellow")
            if(typeof callback == "function") callback();
            return ;
        }
        order = true
        a = 0 //Restart
    } else {
        a++
    }
    setTimeout(function() {
        block.classList.remove("yellow")
        bubbleSort(blocks, callback, a, order)
    }, delay);

}

function random(min, max) {
    return Math.trunc(Math.random() * (+max - +min) + +min); 
}
