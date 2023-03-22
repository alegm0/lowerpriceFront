import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { urlRequest } from '../../urlRequest';

const defaultForm = {
    name: '',
    unit_cost: 0,
    quantity: 0,
    description: '',
    category_id: 1,
    user_id: 1
};

const fieldRequired = '*Campo obligatorio';

const customNumberErrors = {
    unit_cost: ['*Ingrese un costo unitario válido', fieldRequired],
    quantity: ['*Ingrese una cantidad válida', fieldRequired]
}

function CreateEditProduct () {
    const history = useHistory();
    const [formProduct, setFormProduct] = useState(defaultForm);
    const [isSubmit, setIsSubmit] = useState(false);
    const [errorsForm, setErrorsForm] = useState({ unit_cost: '', quantity:'' });

    useEffect(() => {
        if (isSubmit) setErrorsForm({...validateForm().errorsMessage});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmit, formProduct]);

    const validateForm = () => {
        let errors = true;
        const fieldsNumber = Object.keys(customNumberErrors);
        const errorsMessage = { unit_cost: '', quantity:'' };
        Object.keys(formProduct).forEach(key => {
            if (fieldsNumber.includes(key)) {
                if (!formProduct[key]) {
                    errorsMessage[key] = customNumberErrors[key][1];
                    errors = false;
                }
                if (formProduct[key] <= 0) {
                    errorsMessage[key] = customNumberErrors[key][0];
                    errors = false;
                }
            }
            if (!formProduct[key] && key !== 'description') errors = false;
        });
        return {
            errors,
            errorsMessage
        };
    }

    const handleChange = ({target: { name, value }}) => setFormProduct({...formProduct, [name]:value })

    const handleClick = () => {
        setIsSubmit(true);
        if (!validateForm().errors) return;
        axios.post(`${urlRequest}/product`, formProduct).then(({status}) => {
            if (status === 201) {
                Swal.fire({
                    title: 'Creacion exitosa!',
                    text: 'Se ha creado un producto.',
                    icon: 'success',
                    confirmButtonText: 'Continuar', 
                    confirmButtonColor: 'rgb(255, 146, 158)',
                });
                setFormProduct(JSON.parse(JSON.stringify(defaultForm)));
            }
        }).catch((error) => console.error(error)).finally(() => setIsSubmit(false));
    }

    return (
        <div className="body-view">
            <Form>
                <Form.Group>
                    <Form.Label>*Nombre Producto</Form.Label>
                    <Form.Control type="text" placeholder="Producto" onChange={(e) => handleChange(e)} name="name"/>
                    {(isSubmit && !formProduct.name) && <Form.Text>{fieldRequired}</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>*Costo unitario</Form.Label>
                    <Form.Control type="number" placeholder="Costo" onChange={(e) => handleChange(e)} name="unit_cost"/>
                    {(isSubmit && errorsForm.unit_cost) && <Form.Text>{errorsForm.unit_cost}</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>*Cantidad</Form.Label>
                    <Form.Control type="number" placeholder="Cantidad" onChange={(e) => handleChange(e)} name="quantity"/>
                    {(isSubmit && errorsForm.quantity) && <Form.Text>{errorsForm.quantity}</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="textarea" placeholder="Descripción" onChange={(e) => handleChange(e)} name="description"/>
                </Form.Group>
                <Button type="button" onClick={() => history.goBack()}>Atrás</Button>
                <Button type="button" onClick={() => handleClick()}>Guardar</Button>
            </Form>
        </div>
    );
}

export default CreateEditProduct;
