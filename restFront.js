
async function getChecks() {
    try {
        const res = await axios.get('/checks');
        const checks = res.data;
        let checkbox_list = document.getElementsByName("checkbox");
        
    // for(let box of checks) {
    //     document.getElementById(box.id).checked = box.checked;
    // }
        
        let node_list = new Set(); 
        Object.keys(checks).map(function(key) {
            for(let i = 0; i < checkbox_list.length; ++i) {

                let id = checkbox_list.item(i).id
                let val = document.getElementById(id).checked;

                //console.log("id: " + id, " val: " + val);

                let node = document.getElementById(id)
                node_list.add(node);
            }
            console.log("size of checkbox_list: " + checkbox_list.length);
        
            for(let node of node_list) {
                node.addEventListener('change', async() => {
                    try {
                        let val = document.getElementById(node.id).checked;
                        await axios.put('/checks/' + key, {val});
                        getChecks();
                    } catch (err) {
                        console.error(err);
                    }
                    // e.target.checks.value = '';
                });
            }
        });
    
    } catch (err) {
        console.error(err);
    }
}

window.onload = getChecks;

let box_list = document.getElementsByName("checkbox");
let nodes = new Set(); 
for(let i = 0; i < box_list.length; ++i) {

    let id = box_list.item(i).id
    let val = document.getElementById(id).checked;

 //   console.log("id: " + id, " val: " + val);

    let node = document.getElementById(id)
    nodes.add(node);
}
console.log("size of box_list: " + box_list.length);

for(let node of nodes) {
    node.addEventListener('change', async(e) => {
        e.preventDefault();
        let val = e.target.checked;
        try {
            await axios.post('/checks', {val});
            getChecks();
        } catch (err) {
            console.error(err);
        }
    });
}

