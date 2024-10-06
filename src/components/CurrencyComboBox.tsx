"use client"

import * as React from "react"
import { Check, ChevronsUpDown} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMutation, useQuery } from "@tanstack/react-query"
import SkeletonWrapper from "./SkeletonWrapper"
import { UserSettings } from "@prisma/client"
import { Currencies, Currency } from "@/lib/currencies"
import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings"
import { toast } from "sonner"

// const frameworks = [
//     {value: "USD" , lable: "$ Dollar", locale: "en-US"},
//     {value: "EUR" , lable: "€ Euro", locale: "de-DE"},
//     {value: "JPY" , lable: "¥ Yen", locale: "ja-Jp"},
//     {value: "GBP" , lable: "£ Pound", locale: "en-GB"},
//     {value: "IND" , lable: "₹ Rupee", locale: "in-IN"},
// ]

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  //@ts-ignore
const  [selectedOption, setSelectedOption] = React.useState < Currencies | null >(
    null
)
// const [selectedOption, setSelectedOption] = React.useState()

  const userSettings =  useQuery<UserSettings>({
    queryKey:["userSettings"],
    queryFn: ()=> fetch("/api/user-settings").then(res => res.json())
  })


React.useEffect(()=>{
    if(!userSettings.data) return
    const userCurrency = Currencies.find(
        (currercy) => currercy.value === userSettings.data.currency
    )
    if(userCurrency)  setSelectedOption(userCurrency)
},[userSettings.data])
 

const mutation = useMutation({
    mutationFn: UpdateUserCurrency,
    onSuccess:(data:UserSettings) =>{
        toast.success(`Currency update sucessfully `, {
            id:"update-currency"
        })

        setSelectedOption(
            Currencies.find((c) => c.value === data.currency) || null
        )
    },
    onError:(e)=>{
        console.log(e)
        toast.error("Something went wrong",{
            id:"update-currency" 
        })
    }

})

const selectOption = React.useCallback( (currency: Currency | null) =>{
    if(!currency){
        toast.error("Please select a currency")
        return
    }
    toast.loading("Updating currency...",{
        id: "update-currency",
    })
    mutation.mutate(currency.value)
},[mutation]

)

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching} >
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={mutation.isPending}
        >
          {value
            ?  Currencies.find(( Currencies) =>  Currencies.value === value)?.lable
            : "Select Currency..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        
        <Command>
          <CommandInput placeholder="Search Currency..." />
          <CommandList>
            <CommandEmpty>No Currency found.</CommandEmpty>
            <CommandGroup>
              { Currencies.map(( Currencies) => (
                <CommandItem
                  key={ Currencies.value}
                  value={ Currencies.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)  
                    // setSelectedOption ={selectOption}
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value ===  Currencies.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  { Currencies.lable}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </SkeletonWrapper>
  )
}
