// 解析查询字符串
function query2object(queryString) {
    let res = {};
    if (queryString) {
        queryString = queryString.replace('?', '');
        let arr = queryString.split('&');
        arr.forEach(function (ele) {
            let tmpArr = ele.split('=');
            res[tmpArr[0]] = tmpArr[1];
        });
    }
    return res;
}

// 查询字符串变为对象
function object2query(obj) {
    let res = '';
    for (let key in obj) {
        res += key + '=' + obj[key];
    }
    return res;
}

// 更新查询字符串中的某个值
function updateQueryString(key, value) {
    let obj = query2object(location.search);
    obj[key] = value;
    const query = object2query(obj);
    return location.origin + location.pathname + '?' + query;
}