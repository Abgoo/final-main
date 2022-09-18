const link = 'https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json';

async function boxCount(box) {
    let first = box.split(',');
    console.log(first);
    let second = box.split(',').map(element => { return Number(element); });
    console.log(second);
    let count = 0;
    second.forEach(el => { count += el });
    if (count % 10 == 0) return count / 10;
    else return Math.ceil(count / 10);
}

async function storeData(data) {
    const name = data;
    await fetch(link)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else throw new Error("Doesnt Exist");
        }).then((data) => {

            data.forEach(element => {
                if (name == element.name) {
                    document.getElementById('name').innerText = element.name;
                    document.getElementById('contact').innerText = element.email;
                    document.getElementById('input').value = element.boxes;

                    const myElement = document.getElementById('input');
                    boxCount(element.boxes).then((res) => document.getElementById('number').innerText = res);

                    myElement.addEventListener("input", () => boxCount(document.getElementById('input').value)
                        .then((res) => document.getElementById('number').innerText = res));
                }
            });
        })

    .catch((err) => console.error(err));
};