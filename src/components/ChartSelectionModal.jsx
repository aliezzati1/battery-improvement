import React from 'react'
import './ChartSelectionModal.css'

function ChartSelectionModal({ isOpen, onClose, onSelectSeparated, onSelectOverlayed }) {
  if (!isOpen) return null

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <div className="modal-handle" />
        <div className="modal-content">
          <h3 className="modal-title">Choose chart view</h3>
          <div className="modal-options">
            <button 
              className="modal-option"
              onClick={() => {
                onSelectSeparated()
                onClose()
              }}
            >
              <div className="option-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="8" height="8" rx="1" stroke="black" strokeWidth="2"/>
                  <rect x="13" y="3" width="8" height="8" rx="1" stroke="black" strokeWidth="2"/>
                  <rect x="3" y="13" width="8" height="8" rx="1" stroke="black" strokeWidth="2"/>
                  <rect x="13" y="13" width="8" height="8" rx="1" stroke="black" strokeWidth="2"/>
                </svg>
              </div>
              <div className="option-content">
                <h4 className="option-title">View separated charts</h4>
                <p className="option-description">Four independent charts stacked vertically</p>
              </div>
            </button>
            <button 
              className="modal-option"
              onClick={() => {
                onSelectOverlayed()
                onClose()
              }}
            >
              <div className="option-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="1" stroke="black" strokeWidth="2"/>
                  <line x1="3" y1="12" x2="21" y2="12" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                  <line x1="12" y1="3" x2="12" y2="21" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                </svg>
              </div>
              <div className="option-content">
                <h4 className="option-title">View overlayed charts</h4>
                <p className="option-description">Combined charts with tab switching</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChartSelectionModal
