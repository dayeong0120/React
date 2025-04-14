import { useState } from 'react';

const user = {
    name: 'John Doe',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
};

function Profile() {
    return (
        <>
            <h1>{user.name}</h1>
            <img src={user.imageUrl}
                alt={user.name}
                style={{ width: user.imageSize }}
            />
        </>
    )
}

let content;
if (1 == 1) {
    content = <p>안녕이건true</p>
} else {
    content = <p>안녕이건false</p>
}

function Products() {
    const products = [
        { name: "Banana", id: 1, isFruit: true },
        { name: "cookie", id: 2, isFruit: false },
        { name: "bread", id: 3, isFruit: false },
    ]

    function handleClick() {
        alert("왜 누르냐");
    }

    return (
        <>
            {products.map(product =>
                <li key={product.id}
                    style={{ color: product.isFruit ? 'red' : 'green' }}
                > {product.name} </li>
            )}
            <button onClick={handleClick}>눌러봐</button>
        </>
    )
};

function SampleComponent1() {
    function prevPage() {
        alert("뻥이에요");
    }
    return (
        <div style={{
            width: 300, height: 100,
            border: '2px solid black', padding: 20, margin: 20
        }}>
            <h1>뒤로가는 컴포넌트</h1>
            <button onClick={prevPage}>뒤로가기</button>
        </div>
    )
}

// State 사용해보기 
function UseStateButton(a) {
    let [count1, setCount1] = useState(0);
    function button1() {
        setCount1(count1 + 1);
    }

    return (
        <>
            <h3>Counters that update separately</h3>
            <div><button onClick={button1}>Clicked {count1} times</button></div>
        </>
    )
}

// 부모 컴포넌트에서 데이터를 전달받는 컴포넌트 
function PropsComponent({ count, onClick }) {
    return (
        <button onClick={onClick}>Clicked {count} times</button>
    )
}