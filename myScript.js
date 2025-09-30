
const container=document.createElement('div');
container.style.width='200px';
container.style.height='200px';
container.style.backgroundColor='lightblue';
container.style.position='relative';
document.body.appendChild(container);

const displayScore=document.createElement('div');
displayScore.style.marginTop='20px';
displayScore.style.fontSize='20px';
document.body.appendChild(displayScore);
let board=[];
document.getElementById('restart').addEventListener('click', function() {
    for (let i = 0; i < container.children.length; i++) {
        container.children[i].textContent = '';
    }   
    board = [];
    displayScore.textContent = 'Game restarted!';
});
for (let i=0;i<3;i++){
    for (let j=0;j<3;j++){
        const cell=document.createElement('div');
        cell.style.width='60px';
        cell.style.height='60px';
        cell.style.border='1px solid black';
        cell.style.boxSizing='border-box';
        cell.style.position='absolute';
        cell.style.left=`${j*66}px`;
        cell.style.top=`${i*66}px`;
        cell.style.display='flex';
        cell.style.alignItems='center';
        cell.style.justifyContent='center';
        cell.style.fontSize='24px';
        cell.style.cursor='pointer';
        cell.addEventListener('click',function(){
            if (cell.textContent===''){
                displayScore.textContent='x clicked';
                cell.textContent='X';
                board.push('X');
            }   
        });
        container.appendChild(cell);
    }
}