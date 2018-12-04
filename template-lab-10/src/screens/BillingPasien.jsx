import React from 'react';
import { Loading } from '../components/Loading';
import { FormBillingPasien } from '../containers/FormBillingPasien';
import { Appointment } from '../utils/Appointment';

export class BillingPasien extends React.Component {
	/** 
	 * TODO: Akses method getDetailPasien(idPasien) pada Appointment dan lakukan update state. 
	 * TODO: Lakukan pemanggilan pada constructor() atau pada lifecycle componentDidMount()
	 */

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			pasien: {},
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		
		Appointment.getDetailPasien(this.props.match.params.id).then(response =>{
			if (response.status = 200){
				this.setState({
					loading: false,
					pasien: response.result
				})
			} else{
				alert('Data tidak ditemukan')
				this.props.history.push('/all-pasien')
			}
		})
	}

	handleFormSubmit(e) {
		e.preventDefault()
		this.setState({
			loading: true
		})
		
		const data = new FormData(e.target)
		const dataJson = {}

		data.forEach((val, key) => {
			if(val !== ""){
				let name = key.split('.');
				if (name.length > 1){
					let last = name.pop()
					name.reduce((prev, next) => {
						return prev[next] = prev[next] || {};
					}, dataJson)[last] = val
				} else {
					dataJson[key] = val
				}
			}
		})

		Appointment.billingPasien(dataJson).then(response => {
		if (response.status === 200) {
			this.setState({
				loading: false,
				pasien: response.result
			})
			alert(`Sukses billing pasien`)
		} else {
			this.setState({
				loading: false
			})	
			alert(`Gagal billing pasien`)
			}
		})
	}

	render() {
		if (this.state.loading) {
			return (
				<Loading msg="Fetching Data..." />
			)
		} else {
			return (
				<FormBillingPasien pasien={this.state.pasien} onSubmit={this.handleFormSubmit} />
			)
		}
	}
}