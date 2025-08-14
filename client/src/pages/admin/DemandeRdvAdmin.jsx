import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, DatePicker, Input, Tag, message } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { TextArea } = Input;

const DemandeRdvAdmin = () => {
  const [rdvs, setRdvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRdv, setSelectedRdv] = useState(null);
  const [actionType, setActionType] = useState('');
  const [approveDate, setApproveDate] = useState(null);
  const [postponeDate, setPostponeDate] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    fetchRdvs();
  }, []);

  const fetchRdvs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/demo/rdv`);
      // Ensure data is an array before setting it
      const data = Array.isArray(response.data) ? response.data : [];
      setRdvs(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur API:', error);
      message.error('Échec de la récupération des rendez-vous');
      setLoading(false);
      setRdvs([]); // Set to empty array on error
    }
  };

  const handleAction = (rdv, type) => {
    setSelectedRdv(rdv);
    setActionType(type);
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!selectedRdv) return;
  
    try {
      let endpoint = '';
      let data = { adminNotes };
    
      if (actionType === 'approve') {
        if (!approveDate) {
          message.error('Veuillez sélectionner une date d\'approbation');
          return;
        }
        endpoint = 'approve';
        data.approvedDate = approveDate.toISOString();
      } else if (actionType === 'postpone') {
        if (!postponeDate) {
          message.error('Veuillez sélectionner une date de report');
          return;
        }
        endpoint = 'postpone';
        data.postponedDate = postponeDate.toISOString();
      } else if (actionType === 'reject') {
        endpoint = 'reject';
      }

      // Add headers to ensure JSON is properly received
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios.put(
        `${API_URL}/api/demo/rdv/${selectedRdv._id}/${endpoint}`, 
        data,
        config
      );
    
      message.success(`Rendez-vous ${actionType === 'approve' ? 'approuvé' : actionType === 'postpone' ? 'reporté' : 'rejeté'} avec succès`);
      fetchRdvs();
      setIsModalVisible(false);
      setApproveDate(null);
      setPostponeDate(null);
      setAdminNotes('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rendez-vous:', error);
      message.error(`Échec de ${actionType === 'approve' ? 'l\'approbation' : actionType === 'postpone' ? 'le report' : 'le rejet'} du rendez-vous: ${error.response?.data?.message || error.message}`);
    }
  };

  const columns = [
    {
      title: 'Client',
      dataIndex: ['metadata', 'name'],
      key: 'name',
      render: (text, record) => (
        <div>
          <strong>{text}</strong>
          <div>{record.userEmail}</div>
          <div>{record.metadata?.phone || 'N/A'}</div>
          <div>{record.metadata?.company || 'N/A'}</div>
          <div>{record.metadata?.sector || 'N/A'}</div>
        </div>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (!status) return <Tag color="gray">INCONNU</Tag>;
        
        let color = '';
        let statusText = '';
        switch (status.toLowerCase()) {
          case 'approved':
            color = 'green';
            statusText = 'APPROUVÉ';
            break;
          case 'postponed':
            color = 'orange';
            statusText = 'REPORTÉ';
            break;
          case 'rejected':
            color = 'red';
            statusText = 'REJETÉ';
            break;
          default:
            color = 'blue';
            statusText = 'EN ATTENTE';
        }
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Date d\'Approbation/Report',
      key: 'actionDate',
      render: (_, record) => (
        record.approvedDate 
          ? moment(record.approvedDate).format('YYYY-MM-DD HH:mm')
          : record.postponedDate 
            ? moment(record.postponedDate).format('YYYY-MM-DD HH:mm')
            : '-'
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button 
            type="default bg-green-400 text-white" 
            onClick={() => handleAction(record, 'approve')}
            disabled={record.status === 'approved'}
          >
            Approuver
          </Button>
          <Button 
            type="default" 
            onClick={() => handleAction(record, 'postpone')}
            disabled={record.status === 'postponed'}
          >
            Reporter
          </Button>
          <Button 
            danger 
            onClick={() => handleAction(record, 'reject')}
            disabled={record.status === 'rejected'}
          >
            Rejeter
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Demandes de Rendez-vous des Clients</h1>
      
      <Table 
        columns={columns} 
        dataSource={rdvs || []} // Ensure dataSource is always an array
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />

      <Modal
        title={actionType ? `${actionType === 'approve' ? 'Approuver' : actionType === 'postpone' ? 'Reporter' : 'Rejeter'} le Rendez-vous` : ''}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          setApproveDate(null);
          setPostponeDate(null);
          setAdminNotes('');
        }}
        okText={actionType === 'approve' ? 'Approuver' : actionType === 'postpone' ? 'Reporter' : 'Rejeter'}
        cancelText="Annuler"
        width={600}
      >
        {selectedRdv && (
          <div className="space-y-4">
            <div>
              <strong>Client:</strong> {selectedRdv.metadata?.name || 'N/A'}
            </div>
            <div>
              <strong>Date Demandée:</strong> {selectedRdv.requestedDate ? moment(selectedRdv.requestedDate).format('YYYY-MM-DD HH:mm') : 'N/A'}
            </div>
            
            {actionType === 'approve' && (
              <div>
                <label className="block mb-2">Date d'Approbation:</label>
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  style={{ width: '100%' }}
                  onChange={(date) => setApproveDate(date)}
                  value={approveDate}
                />
              </div>
            )}
            
            {actionType === 'postpone' && (
              <div>
                <label className="block mb-2">Date de Report:</label>
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  style={{ width: '100%' }}
                  onChange={(date) => setPostponeDate(date)}
                  value={postponeDate}
                />
              </div>
            )}
            
            <div>
              <label className="block mb-2">Notes de l'Administrateur:</label>
              <TextArea
                rows={4}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Ajoutez des notes pour le client..."
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DemandeRdvAdmin;