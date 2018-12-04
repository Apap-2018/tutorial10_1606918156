import React from 'react';
import { DaftarDokterRow } from '../components/DaftarDokterRow';
import { Loading } from '../components/Loading';
import { TableContainer } from '../containers/TableContainer';
import { Appointment } from '../utils/Appointment';

export class DaftarDokter extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			listDokter: []
		}
		Appointment.getAllDokter().then(response => {
			this.setState({
				loading: false,
				listDokter: response.result
			})
		})
	}


	render() {
        if (this.state.loading) {
            return (
                <Loading msg="Fetching Data..."/>
            )
        } else {
            return (
                <TableContainer title="Daftar Dokter" header={['Nama Dokter']}>
                    <DaftarDokterRow listDokter={this.state.listDokter}/>
                </TableContainer>
            )
        }
	}
}