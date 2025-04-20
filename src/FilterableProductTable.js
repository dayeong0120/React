import { useState } from "react";

function ProductRow({ product }) {
    const nameData = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>
    return (
        <tr>
            <td>{nameData}</td>
            <td>{product.price}</td>
        </tr>
    )
}
function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan={2}><strong>{category}</strong></th>
        </tr>
    )
}

function ProductTable({ products, filterText, inStockOnly }) {
    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
        // 새로운 카테고리면 카테고리 행 추가 
        if (product.category.toLowerCase().indexOf(filterText.toLowerCase()) === -1) { // 사용자가 입력한 필터검색어가 현재 상품의 category 의 부분집합이 아닐 때 
            return;
        }
        if (inStockOnly && !product.stocked) { // stockOnly가 체크되었고, 현재 상품의 재고가 false라면 보이지 않게 해야한다 
            return;
        }

        if (lastCategory !== product.category) {
            rows.push(
                <ProductCategoryRow category={product.category} key={product.category} />
            )
        };
        rows.push(
            <ProductRow product={product} key={product.name} />
        );
        lastCategory = product.category;



    });

    return (
        <table style={{ width: '20%' }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

function SearchBar({ onFilterTextChange, onInStockOnlyChange }) {
    return (
        <>
            <form>
                <div>
                    <input type="text" placeholder="Search..." name="keyword"
                        onChange={(e) => onFilterTextChange(e.target.value)}
                    />
                </div>
                <div>
                    <input type="checkBox" id="stock-check" name="onlyStock"
                        onChange={(e) => onInStockOnlyChange(e.target.checked)}
                    />
                    <label for="stock-check">Only show products in stock</label>
                </div>
            </form>
        </>
    )
}

export function FilterableProductTable({ products }) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <>
            <div>
                <SearchBar onFilterTextChange={setFilterText} onInStockOnlyChange={setInStockOnly} />
            </div>
            <div>
                <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
            </div>
        </>
    )
}