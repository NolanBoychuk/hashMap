function hashMap(){
    return {
        hashMap: Array.from({ length: 16 }, () => []),
        hash(value){
            let hashCode = 0;
            const primeNumber = 31;
            for (let i = 0; i < value.length; i++) {
                hashCode = primeNumber * hashCode + value.charCodeAt(i);
            }
            return hashCode % this.hashMap.length;
        },
        calculateLoadFactor() {
            const totalElements = this.hashMap.reduce((count, array) => count + array.length, 0);
            const totalBuckets = this.hashMap.length;
            if (totalBuckets === 0) {
                return 0;
            };
            return totalElements / totalBuckets;
        },
        loadFactorHandler (){
            let load = this.calculateLoadFactor();
            if (load < 0.8){
                return;
            };
            const newArray = Array.from({ length: this.hashMap.length * 2 }, () => []);
            for(let i = 0; i < this.hashMap.length; i++){
                if(this.hashMap[i].length !== 0){
                    for(let j = 0; j < this.hashMap[i].length; j++){
                        const {key, value} = this.hashMap[i][j];
                        const newHashedVlaue = this.hash(key) % newArray.length;
                        newArray[newHashedVlaue].push({key, value});
                    };
                };
            };
            this.hashMap = newArray;
        },
        set(key, value){
            let hashedKey = this.hash(key);
            let collisionIndex = -1; 
            for (let i = 0; i < this.hashMap[hashedKey].length; i++) {
                if (this.hashMap[hashedKey][i].key === key) {
                    collisionIndex = i;
                    break;
                }
            }
            if (collisionIndex === -1) {
                this.hashMap[hashedKey].push({ key, value });
            } else {
                this.hashMap[hashedKey][collisionIndex].value = value;
            }
            this.loadFactorHandler();
        },
        get(key){
            const hashKey = this.hash(key);
            for(let i = 0; i < this.hashMap[hashKey].length; i++){
                if(this.hashMap[hashKey][i].key === key){
                    return this.hashMap[hashKey][i].value;
                };
            };
            return null;
        },
        has(key){
            const hashKey = this.hash(key);
            for(let i = 0; i < this.hashMap[hashKey].length; i++){
                if(this.hashMap[hashKey][i].key === key){
                    return true;
                };
            };
            return false;
        },
        remove(key){
            const hashKey = this.hash(key);
            if(!this.has(key)){
                return;
            };
            for(let i = 0; i < this.hashMap[hashKey].length; i++){
                if(this.hashMap[hashKey][i].key === key){
                    this.hashMap[hashKey].splice(i, 1);
                };
            };
        },
        length(){
            return this.hashMap.reduce((total, current) => total + current.length, 0);
        },
        clear(){
            this.hashMap = new Array(16).fill([]);
        },
        keys(){
            let myKeys = [];
            for(let i = 0; i < this.hashMap.length; i++){
                for(let j = 0; j < this.hashMap[i].length;j++){
                    myKeys.push(this.hashMap[i][j].key);
                };
            };
            return myKeys;
        },
        values(){
            let values = [];
            for(let i = 0; i < this.hashMap.length; i++){
                for(let j = 0; j < this.hashMap[i].length;j++){
                    values.push(this.hashMap[i][j].value);
                };
            };
            return values;
        },
        entries(){
            let all = [];
            for(let i = 0; i < this.hashMap.length; i++){
                for(let j = 0; j < this.hashMap[i].length; j++){
                    all.push([this.hashMap[i][j].key, this.hashMap[i][j].value]);
                };
            };
            return all;
        },
    }; 
};

