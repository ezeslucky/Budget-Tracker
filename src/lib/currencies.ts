export const  Currencies  =[
    {value: "USD" , lable: "$ Dollar", locale: "en-US"},
    {value: "EUR" , lable: "€ Euro", locale: "de-DE"},
    {value: "JPY" , lable: "¥ Yen", locale: "ja-Jp"},
    {value: "GBP" , lable: "£ Pound", locale: "en-GB"},
    {value: "IND" , lable: "₹ Rupee", locale: "in-IN"},
    
]

export type Currency = (typeof Currencies)[0]