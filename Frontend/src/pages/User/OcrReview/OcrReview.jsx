import React, { useState } from 'react';
import api from '../../../services/api';
import './OcrReview.css';

export default function OcrReview() {
  const [billId, setBillId] = useState('');
  const [ocrData, setOcrData] = useState(null);
  const [validationData, setValidationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    setError('');
    setOcrData(null);
    setValidationData(null);
    setLoading(true);

    try {
      const ocrRes = await api.post('/ocr', { bill_id: billId });
      setOcrData(ocrRes.data.data);

      const valRes = await api.post('/validate', { bill_id: billId });
      setValidationData(valRes.data.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Backend not connected');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ocr-review-page">
      <h1>OCR Review</h1>
      <p className="ocr-review__desc">Bill ID daalo, OCR aur Validation dono chalenge.</p>

      <form className="ocr-review__form" onSubmit={handleScan}>
        <input
          type="text"
          placeholder="Enter Bill ID"
          value={billId}
          onChange={(e) => setBillId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Scan & Validate'}
        </button>
      </form>

      {error && <p className="ocr-review__error">{error}</p>}

      {ocrData && (
        <div className="ocr-review__card">
          <h2>Extracted Fields</h2>
          <table>
            <tbody>
              {Object.entries(ocrData).map(([key, value]) => (
                <tr key={key}>
                  <td className="ocr-review__label">{key}</td>
                  <td>{value === null || value === '' ? <span className="ocr-review__missing">Not found</span> : String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {validationData && (
        <div className="ocr-review__card">
          <h2>Validation Result</h2>
          <ul className="ocr-review__flags">
            <li className={validationData.gst_valid ? 'pass' : 'fail'}>
              GSTIN Valid: {validationData.gst_valid ? 'Yes' : 'No'}
            </li>
            <li className={validationData.tax_valid ? 'pass' : 'fail'}>
              Tax/Amount Valid: {validationData.tax_valid ? 'Yes' : 'No'}
            </li>
            <li className={!validationData.duplicate ? 'pass' : 'fail'}>
              Duplicate Invoice: {validationData.duplicate ? 'Yes' : 'No'}
            </li>
            {validationData.missing_fields.length > 0 && (
              <li className="fail">
                Missing Fields: {validationData.missing_fields.join(', ')}
              </li>
            )}
          </ul>
          <p className="ocr-review__remarks">{validationData.remarks}</p>
        </div>
      )}
    </div>
  );
}