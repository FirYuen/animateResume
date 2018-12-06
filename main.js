var result = `/*
*你好
*我将以动画的形式来介绍我自己
*只用文字介绍太单调了
*我就用代码来介绍吧
*首先准备一些样式
*/
*{
    transition: all 1s;
    font-family: 'Courier New', Courier, monospace

}

html{
    background: rgb(222,222,222);
    font-size: 16px;
}
#code{
    border: 1px solid red;
    padding: 15px;
}
/* 我需要一点代码高亮 */

.token.selector{
    color:#690
}
.token.string{
    color:#2AA198
}
.token.comment{
    color:#93a1a1
}
.token.property{
    color:#905
}
.token.function{
    color:#DD4A68
}



/* 不玩了,我来介绍下自己吧 */
/* 我需要一张白纸 */

#code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%
}
#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}
#paper > .content{
    background: white;
    height: 100%;
    width: 100%;

}
`

var result2 = `
#paper{
    
   
}
`

var md = `
# 标题1
部首买丈米义夫脸取宫她创包及。女奖信团！
# 标题1
包仍河三司萨机按标刻局目？春臓字山听纪！
# 标题1
交加目喝又突果商态视望受阵你究脑。太次！
# 标题1
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, a!
# 标题1
# 标题1
`

function writeCode(prefix, code) {
    return new Promise(function (resolve, reject) {
        let documentCode = document.querySelector("#code")
        documentCode.innerHTML = prefix || ""
        let styleTag = document.querySelector("#styleTag ")
        let n = 0
        let timer = setInterval(() => {
            n += 1
            //documentCode.innerHTML = code.substring(0,n)
            documentCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
            styleTag.innerHTML = prefix + code.substring(0, n)
            documentCode.scrollTop = documentCode.scrollHeight
            if (n > code.length) {
                clearInterval(timer)
                resolve()
            }
        }, 0);
    })
}

function writeMarkdown(markdown) {
    return new Promise(function (resolve, reject) {
        let documentPaper = document.querySelector('#paper>.content')
        let n = 0
        let timer = setInterval(() => {
            n += 1
            documentPaper.innerHTML = Prism.highlight(markdown.substring(0, n), Prism.languages.markdown)
            documentPaper.scrollTop = documentPaper.scrollHeight
            if (n > markdown.length) {
                clearInterval(timer)
                resolve()
            }
        })
    })

}

function createPaper() {
    return new Promise(function (resolve, reject) {
        let paper = document.createElement('div')
        paper.id = "paper"
        let content = document.createElement("pre")
        content.className = 'content'
        paper.appendChild(content)
        document.body.appendChild(paper)

        resolve()
    })
}


writeCode("", result)
    .then(
        () => {
            createPaper().then(
                writeCode(result, result2), () => {
                    console.log("error")
                }
            ).then(
                writeMarkdown(md),
                () => {
                    console.log("error")
                }
            )
        },
        () => {
            console.log("error")
        })
