const validators = {
    required: val => !!val,
    number: val => {
        val = val.split(' ').join('');
        const re = /(^[+0-9]?)(\d+)$/g;
        return re.test(val.toString());
    },
    email: val => {
        if(val){
            const re = /(^[a-z]+[!#$%&'*+-/=?^_`{|]?[a-z]+@[a-z]+)(\.[a-z]{2,})+/gi;
            return re.test(val.toString());
        }
        return true;
    }
}

export default validators;