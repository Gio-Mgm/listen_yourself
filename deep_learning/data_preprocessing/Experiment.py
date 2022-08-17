from tensorflow.config.experimental import list_physical_devices, set_memory_growth
from tensorflow.config.threading import set_inter_op_parallelism_threads, set_intra_op_parallelism_threads

class Experiment():
    def __init__(self, use_gpu, n_thread=1):
        if use_gpu:
            gpus = list_physical_devices('GPU')
            print(gpus)
            for gpu in gpus:
                set_memory_growth(gpu, True)
