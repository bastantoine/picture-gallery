import argparse
import logging
from pylint.lint import Run

"""Usefull script to run pylint on a given list of files or folder which fails only if the score is below a given threshold.

Used in GitHub Actions

Based on https://medium.com/analytics-vidhya/pylint-static-code-analysis-github-action-to-fail-below-a-score-threshold-58a124aafaa0
"""


logging.getLogger().setLevel(logging.INFO)

parser = argparse.ArgumentParser(prog="LINT")

parser.add_argument('-p',
                    '--path',
                    help='path to directory you want to run pylint | '
                         'Type: %(type)s ',
                    type=str)

parser.add_argument('-t',
                    '--threshold',
                    help='score threshold to fail pylint runner | '
                         'Default: %(default)s | '
                         'Type: %(type)s ',
                    default=7,
                    type=float)

parser.add_argument('--rcfile',
                    help='rcfile used to configure pylint | '
                         'Type: %(type)s ',
                    type=str)

args = parser.parse_args()
path = str(args.path)
threshold = float(args.threshold)
rcfile = str(args.rcfile)

logging.info('Pylint Starting | '
             'Path: {} | '
             'Threshold: {} '.format(path, threshold))

results = Run([path, '--rcfile=%s' % rcfile], do_exit=False)

final_score = results.linter.stats['global_note']

if final_score < threshold:

    message = ('Pylint Failed | '
               'Score: {} | '
               'Threshold: {} '.format(final_score, threshold))

    logging.error(message)
    raise Exception(message)

else:
    message = ('Pylint Passed | '
               'Score: {} | '
               'Threshold: {} '.format(final_score, threshold))

    logging.info(message)

    exit(0)