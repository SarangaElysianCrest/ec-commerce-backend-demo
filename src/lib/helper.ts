// import ctx from '../lib/context';
// import { LessThanOrEqual, IsNull, MoreThan, LessThan } from 'typeorm';
// import { unlink } from 'fs-extra';
// import logger from './logger';
// import { join } from 'path';
//
// const STAGING_FOLDER = join(__dirname, '../../data/staging');;
//
// export function removeProposalIfUnasigned(proposalId: number) {
//   setTimeout(() => {
//     ctx.db.proposalRepository.findOne({
//       id: proposalId,
//       assigned: false
//     }).then(proposal => {
//       if (!proposal) {
//         logger.info("proposal not found");
//         throw null;
//       }
//       unlink(`${STAGING_FOLDER}/${proposal.id}.pdf`).catch(err => {
//         logger.error(err);
//       });
//       logger.info('removed file');
//       return ctx.db.proposalRepository.remove(proposal);
//     }).catch(err => {
//       if (err === null) {
//         return;
//       }
//       logger.error(err);
//     });
//   }, 1000 * 60 * 5);
// }