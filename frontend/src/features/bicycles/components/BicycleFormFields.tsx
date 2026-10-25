import type { Brand } from '../../brands/services/brandService'

export interface BicycleFormValues {
    brandId: string
    model: string
    description: string
    price: string
    stock: string
}

interface BicycleFormFieldsProps {
    values: BicycleFormValues
    brands: Brand[]
    onChange: (field: keyof BicycleFormValues, value: string) => void
    disabled?: boolean
}

function updateValidationMessage(input: HTMLInputElement) {
    input.setCustomValidity('')
    const { validity, name } = input
    let message = ''

    if (validity.badInput) {
        message = 'Enter a valid number.'
    } else if (validity.valueMissing) {
        const requiredMessages: Record<string, string> = {
            brand: 'Enter the bicycle brand.',
            model: 'Enter the bicycle model.',
            price: 'Enter the bicycle price.',
            stock: 'Enter the stock quantity.',
        }
        message = requiredMessages[name] ?? 'Complete this field.'
    } else if (validity.patternMismatch) {
        message = name === 'brand'
            ? 'The brand cannot contain only spaces.'
            : 'The model cannot contain only spaces.'
    } else if (validity.tooLong) {
        message = 'Enter no more than 150 characters.'
    } else if (validity.rangeUnderflow) {
        message = name === 'price'
            ? 'The price must be greater than or equal to 0.'
            : 'Stock must be greater than or equal to 0.'
    } else if (validity.rangeOverflow) {
        message = name === 'price'
            ? 'El precio no puede superar 99.999.999,99 €.'
            : 'Stock cannot exceed 4,294,967,295 units.'
    } else if (validity.stepMismatch) {
        message = name === 'price'
            ? 'Enter a price with no more than two decimal places.'
            : 'Enter a whole number for stock.'
    }

    input.setCustomValidity(message)
}

function BicycleFormFields({ values, brands, onChange, disabled }: BicycleFormFieldsProps) {
    const inputClass = 'mt-1 w-full rounded border border-gray-300 p-2'

    return (
        <fieldset disabled={disabled} className="space-y-4 disabled:opacity-60"
            onInvalid={(event) => {
                if (event.target instanceof HTMLInputElement) updateValidationMessage(event.target)
            }}
            onInput={(event) => {
                if (event.target instanceof HTMLInputElement) updateValidationMessage(event.target)
            }}>
            <label className="block">
                Brand
                <select autoFocus name="brandId" required
                    className={inputClass} value={values.brandId}
                    onChange={(event) => onChange('brandId', event.target.value)}>
                    <option value="">Select a brand</option>
                    {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
                </select>
            </label>
            <label className="block">
                Model
                <input name="model" required maxLength={150} pattern=".*\S.*"
                    className={inputClass} value={values.model}
                    onChange={(event) => onChange('model', event.target.value)} />
            </label>
            <label className="block">
                Description (optional)
                <textarea name="description" rows={3} className={inputClass}
                    value={values.description}
                    onChange={(event) => onChange('description', event.target.value)} />
            </label>
            <label className="block">
                Price (€)
                <input name="price" type="number" required min="0" max="99999999.99" step="0.01"
                    className={inputClass} value={values.price}
                    onChange={(event) => onChange('price', event.target.value)} />
            </label>
            <label className="block">
                Stock
                <input name="stock" type="number" required min="0" max="4294967295" step="1"
                    className={inputClass} value={values.stock}
                    onChange={(event) => onChange('stock', event.target.value)} />
            </label>
        </fieldset>
    )
}

export default BicycleFormFields
