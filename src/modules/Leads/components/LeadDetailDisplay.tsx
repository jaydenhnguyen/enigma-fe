import { Card, CardContent, Typography, Chip, CircularProgress, Alert } from '@mui/material';
import type { LeadDetailsProps } from '..';
import { useLeadDetail, CustomerJourney } from '..';
import classes from '../styles/LeadDetailDisplay.module.scss';

export function LeadDetailDisplay({ lead }: LeadDetailsProps): React.ReactElement {
  const { leadDetail, loading, error, updateLeadStatus } = useLeadDetail(lead.id);

  if (loading && !leadDetail) {
    return (
      <div className={classes['loading-container']}>
        <CircularProgress />
        <Typography>Loading lead details...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className={classes['error-alert']}>
        {error}
      </Alert>
    );
  }

  if (!leadDetail) {
    return (
      <Alert severity="warning" className={classes['warning-alert']}>
        No lead details found
      </Alert>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatMoveDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={classes['lead-details-container']}>
      {/* Header Section */}
      <div className={classes['header-section']}>
        <div className={classes['lead-header']}>
          <Typography variant="h4" className={classes['lead-name']}>
            {leadDetail.fullName}
          </Typography>
          <Chip
            label={leadDetail.hiredUs ? 'Hired Us' : 'Prospect'}
            color={leadDetail.hiredUs ? 'success' : 'default'}
            className={classes['hire-status-chip']}
          />
        </div>
      </div>

      {/* Contact Information */}
      <Card className={classes['section-card']}>
        <CardContent>
          <Typography variant="h6" className={classes['section-title']}>
            Contact Information
          </Typography>
          <div className={classes['contact-grid']}>
            {leadDetail.email && (
              <div className={classes['contact-item']}>
                <Typography variant="body2" className={classes['contact-label']}>
                  Email:
                </Typography>
                <Typography variant="body1" className={classes['contact-value']}>
                  {leadDetail.email}
                </Typography>
              </div>
            )}
            {leadDetail.phone && (
              <div className={classes['contact-item']}>
                <Typography variant="body2" className={classes['contact-label']}>
                  Phone:
                </Typography>
                <Typography variant="body1" className={classes['contact-value']}>
                  {leadDetail.phone}
                </Typography>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Move Details */}
      <Card className={classes['section-card']}>
        <CardContent>
          <Typography variant="h6" className={classes['section-title']}>
            Move Details
          </Typography>
          <div className={classes['move-dates']}>
            <Typography variant="body2" className={classes['move-label']}>
              Move Dates:
            </Typography>
            <div className={classes['dates-container']}>
              {leadDetail.moveDates.map((date, index) => (
                <Chip
                  key={index}
                  label={formatMoveDate(date)}
                  variant="outlined"
                  className={classes['date-chip']}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Journey */}
      <Card className={classes['section-card']}>
        <CardContent>
          <CustomerJourney
            currentStatus={leadDetail.currentStatus || 'New'}
            onStatusChange={updateLeadStatus}
            loading={loading}
          />
        </CardContent>
      </Card>

      {/* Status History */}
      {leadDetail.statusHistory && leadDetail.statusHistory.length > 0 && (
        <Card className={classes['section-card']}>
          <CardContent>
            <Typography variant="h6" className={classes['section-title']}>
              Status History
            </Typography>
            <div className={classes['history-timeline']}>
              {leadDetail.statusHistory.map((entry, index) => (
                <div key={entry._id || index} className={classes['history-entry']}>
                  <div className={classes['history-dot']}></div>
                  <div className={classes['history-content']}>
                    <Typography variant="body1" className={classes['history-status']}>
                      {entry.modifiedToStatus}
                    </Typography>
                    <Typography variant="body2" className={classes['history-timestamp']}>
                      {formatDate(entry.timestamp)}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* UTM Information */}
      {leadDetail.utm && (
        <Card className={classes['section-card']}>
          <CardContent>
            <Typography variant="h6" className={classes['section-title']}>
              UTM Tracking
            </Typography>
            <div className={classes['utm-grid']}>
              {Object.entries(leadDetail.utm).map(([key, value]) => (
                <div key={key} className={classes['utm-item']}>
                  <Typography variant="body2" className={classes['utm-label']}>
                    {key.replace('utm_', '').toUpperCase()}:
                  </Typography>
                  <Typography variant="body1" className={classes['utm-value']}>
                    {value}
                  </Typography>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events Associated */}
      {leadDetail.eventsAssociated && leadDetail.eventsAssociated.length > 0 && (
        <Card className={classes['section-card']}>
          <CardContent>
            <Typography variant="h6" className={classes['section-title']}>
              Associated Events
            </Typography>
            <div className={classes['events-container']}>
              {leadDetail.eventsAssociated.map((eventId, index) => (
                <Chip
                  key={index}
                  label={eventId}
                  variant="outlined"
                  className={classes['event-chip']}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metadata */}
      <Card className={classes['section-card']}>
        <CardContent>
          <Typography variant="h6" className={classes['section-title']}>
            Metadata
          </Typography>
          <div className={classes['metadata-grid']}>
            <div className={classes['metadata-item']}>
              <Typography variant="body2" className={classes['metadata-label']}>
                Created:
              </Typography>
              <Typography variant="body1" className={classes['metadata-value']}>
                {formatDate(leadDetail.createdAt)}
              </Typography>
            </div>
            <div className={classes['metadata-item']}>
              <Typography variant="body2" className={classes['metadata-label']}>
                Last Updated:
              </Typography>
              <Typography variant="body1" className={classes['metadata-value']}>
                {formatDate(leadDetail.updatedAt)}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
